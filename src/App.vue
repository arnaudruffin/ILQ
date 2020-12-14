<template>
  <v-app>
    <v-main>
      <v-container>

        <v-alert dense outlined type="error" v-if="diError">
          {{ diError }}
        </v-alert>

        <v-alert dense outlined type="error" v-if="ddError">
          {{ ddError }}
        </v-alert>

        <v-alert dense outlined type="error" v-if="organError">
          {{ organError }}
        </v-alert>

        <v-card elevation="2">
          <v-card-title>Calculateur d'équivalent de dose</v-card-title>
          <v-card-subtitle>Modèle linéaire quadratique</v-card-subtitle>
          <v-card-text>
            <v-form ref="form">
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
                  label="Dose par fraction initiale"
              ></v-text-field>
              <v-text-field
                  type="number"
                  step="any"
                  v-model="dfs"
                  min="1"
                  max="6"
                  label="Dose par fraction souhaitées"
              ></v-text-field>
            </v-form>

            Dose équivalente biologique:
            <p class="text-center font-weight-black">{{ result }}
              <v-chip v-if="result" class="ma-2 text-center font-weight-black" color="green" text-color="white" x-large>
                {{ result }}
              </v-chip>
            </p>


          </v-card-text>
        </v-card>

        <v-banner>
          Le calculateur peut être utilisé dans les conditions suivantes (accord
          experts SFRO) :
          <ul>
            <li>Dose par fraction comprise entre 1 et 6 Gy</li>

            <li>Deux séances doivent être espacées d'au moins 6 à 8 heures</li>
            <li>Étalement constant</li>
          </ul>
          <template v-slot:actions>
            <v-btn text color="primary"> Dismiss</v-btn>
            <v-btn text color="primary"> Retry</v-btn>
          </template>
        </v-banner>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Organ, {ALL_ORGANS} from "./bean/Organ";

@Component
export default class App extends Vue {
  private organs: Organ[] = ALL_ORGANS;
  selectedOrgan: Organ | null = null;

  dt: number | null = null;
  dfi: number | null = null;
  dfs: number | null = null;

  organError: string | null = null;
  ddError: string | null = null;
  diError: string | null = null;

  showAlert(message: string) {
    console.log(message);
  }

  get result(): number | null {


    if (this.dfi && (this.dfi > 8 || this.dfi < 1)) {
      this.ddError = "Vous sortez des limites du modèle pour la <strong>dose initiale</strong>, les doses calculées par le modèle ne peuvent être considérées comme valides."
    } else {
      this.ddError = null
    }

    if (this.dfs && (this.dfs > 8 || this.dfs < 1)) {
      this.diError = "Vous sortez des limites du modèle pour la <strong>dose désirée</strong>, les doses calculées par le modèle ne peuvent être considérées comme valides."
    } else {
      this.diError = null
    }

    if (this.selectedOrgan && this.dfs && this.dfi && this.dt) {
      //TODO animate on new rendering
      //TODO afficher les GY
      //TODO show warn as overlay
      //TODO handler errot messag
      const organValue = this.selectedOrgan.value;
      console.log(organValue);
      console.log(this.dfi);
      console.log(this.dfs);
      console.log(this.dt);

      const doseEquivalente = (this.dt * (organValue + +this.dfi)) / (organValue + +this.dfs);


      // verifier contraintes organe
      if (this.selectedOrgan.doseMax && doseEquivalente > this.selectedOrgan.doseMax) {
        this.organError = "Le guide des procédures de radiothérapie externe recommande de ne pas dépasser " + this.selectedOrgan.doseMax + " Gy en dose totale pour cet organe. (" + this.selectedOrgan.name + ")";
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
