<template>
  <v-app>
    <v-main>
      <v-container>
        <v-slide-y-transition>
          <v-banner v-if="deferredPrompt" color="info" dark class="text-center" transition="scale-transition">
            Installez l'application, cela vous permettra d'utiliser ILQ même sans réseau.
            <template v-slot:actions>
              <v-btn text @click="dismiss">Pas la peine</v-btn>
              <v-btn text @click="install">Installer</v-btn>
            </template>
          </v-banner>
        </v-slide-y-transition>


        <v-card elevation="2">
          <v-card-title>Calculateur d'équivalent de dose</v-card-title>
          <v-card-subtitle>Modèle linéaire quadratique</v-card-subtitle>
          <v-card-text>
            <p v-if="result && valid" class="text-center font-weight-black">
              Dose équivalente biologique:
            </p>
            <p class="text-center font-weight-black">
              <v-chip v-if="result && valid"
                      class="ma-2 text-center font-weight-black"
                      :color="chipColor" text-color="white"
                      x-large>
                {{ result }}
              </v-chip>
            </p>

            <v-alert dense outlined type="error" v-if="organError && valid">
              {{ organError }}
            </v-alert>

            <v-form ref="form" v-model="valid">
              <v-select
                  type="number"
                  v-model="selectedOrgan"
                  :hint="
                  selectedOrgan
                    ? `${selectedOrgan.name},⍺β: ${selectedOrgan.value}`
                    : 'organe'
                "
                  :items="organs"
                  item-text="name"
                  item-value="name"
                  label="Sélectionnez l'organe à risque"
                  persistent-hint
                  return-object
                  single-line
              ></v-select>

              <v-text-field
                  v-model="dt"
                  step="any"
                  type="number"
                  label="Dose totale"
              ></v-text-field>
              <v-text-field
                  type="number"
                  min="1"
                  max="6"
                  v-model="dfi"
                  :rules="dfiRule"
                  label="Dose par fraction initiale"
              ></v-text-field>
              <v-text-field
                  type="number"
                  step="any"
                  v-model="dfs"
                  min="1"
                  max="6"
                  :rules="dfsRule"
                  label="Dose par fraction souhaitées"
              ></v-text-field>
            </v-form>


          </v-card-text>
          <v-overlay :absolute="true" opacity="0.9" :value="overlay">
            Le calculateur peut être utilisé dans les conditions suivantes (accord
            experts SFRO) :
            <ul>
              <li>Dose par fraction comprise entre 1 et 6 Gy</li>

              <li>Deux séances doivent être espacées d'au moins 6 à 8 heures</li>
              <li>Étalement constant</li>
            </ul>

            <v-btn
                color="success"
                @click="overlay = false"
            >
              OK
            </v-btn>
          </v-overlay>
        </v-card>


      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Organ, {ALL_ORGANS} from "./bean/Organ";
import Cookies from "js-cookie"

@Component
export default class App extends Vue {
  private organs: Organ[] = ALL_ORGANS;
  selectedOrgan: Organ | null = null;
  valid = false;

  dt: number | null = null;
  dfi: number | null = null;
  dfs: number | null = null;

  organError: string | null = null;
  deferredPrompt: any | null = null

  overlay = false;

  dfiRule = [
    (v: number) => {
      return (1 <= v && v <= 8) || "Vous sortez des limites du modèle pour la dose initiale, les doses calculées par le modèle ne peuvent être considérées comme valides.";
    }
  ];

  dfsRule = [
    (v: number) => {
      return (1 <= v && v <= 8) || "Vous sortez des limites du modèle pour la dose désirée, les doses calculées par le modèle ne peuvent être considérées comme valides.";
    }
  ];

  created() {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      if (Cookies.get("install-prompt") === undefined) {
        this.deferredPrompt = e;
      }
    })
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    })
  }

  async dismiss() {
    Cookies.set("install-prompt", "damned", {expires: 5})
    this.deferredPrompt = null;
  }

  async install() {
    this.deferredPrompt?.prompt();
  }

  get chipColor(): string {
    if (this.organError) {
      return "red"
    } else {
      return "green"
    }
  }


  get result(): number | null {


    if (this.selectedOrgan && this.dfs && this.dfi && this.dt) {
      //TODO animate on new rendering
      //TODO afficher les GY
      //TODO layout full screen card
      const organValue = this.selectedOrgan.value;
      const doseEquivalente = (this.dt * (organValue + +this.dfi)) / (organValue + +this.dfs);

      // verifier contraintes organe
      if (this.selectedOrgan.doseMax && doseEquivalente > this.selectedOrgan.doseMax) {
        this.organError = "Le guide des procédures de radiothérapie externe recommande de ne pas dépasser " + this.selectedOrgan.doseMax + " Gy en dose totale pour cet organe (" + this.selectedOrgan.name + ")";
      } else {
        this.organError = null
      }

      console.log(doseEquivalente);
      return Math.round(doseEquivalente * 100) / 100;
    } else {
      return null;
    }
  }

}
</script>
