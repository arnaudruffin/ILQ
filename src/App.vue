<template>
  <v-app>
    <v-main>
      <v-container>
        <v-alert dense outlined type="error">
          I'm a dense alert with the <strong>outlined</strong> prop and a
          <strong>type</strong> of error
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
            <v-btn text color="primary"> Dismiss </v-btn>
            <v-btn text color="primary"> Retry </v-btn>
          </template>
        </v-banner>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Organ, { ALL_ORGANS } from "./bean/Organ";

@Component
export default class App extends Vue {
  private organs: Organ[] = ALL_ORGANS;
  selectedOrgan: Organ | null = null;

  dt: number | null = null;
  dfi: number | null = null;
  dfs: number | null = null;

  showAlert(message: string) {
    console.log(message);
  }
  get result(): number | null {
    if (this.selectedOrgan && this.dfs && this.dfi && this.dt) {
      //TODO animate on new rendering
      //TODO afficher les GY
      //TODO show warn as overlay
      //TODO handler errot messag
      const organevalue = this.selectedOrgan!.value;
      const dosefraction1 = this.dfi!;
      const dosefraction2 = this.dfs!;
      const dosetotale1 = this.dt!;

      console.log(organevalue);
      console.log(dosefraction1);
      console.log(dosefraction2);
      console.log(dosetotale1);

      const doseeq =
        (dosetotale1 * (organevalue + +dosefraction1)) /
        (organevalue + +dosefraction2);

      console.log(dosetotale1 * (organevalue + +dosefraction1));
      console.log(organevalue + +dosefraction2);
      if (dosefraction1 > 8) {
        this.showAlert(
          "Vous sortez des limites du modèle pour la dose initiale, les doses calculées par le modèle ne peuvent être considérées comme valides."
        );
      }
      if (dosefraction1 < 1) {
        this.showAlert(
          "Vous sortez des limites du modèle pour la dose initiale, les doses calculées par le modèle ne peuvent être considérées comme valides."
        );
      }
      if (dosefraction2 > 8) {
        this.showAlert(
          "Vous sortez des limites du modèle pour la dose désirée, les doses calculées par le modèle ne peuvent être considérées comme valides."
        );
      }
      if (dosefraction2 < 1) {
        this.showAlert(
          "Vous sortez des limites du modèle pour la dose désirée, les doses calculées par le modèle ne peuvent être considérées comme valides."
        );
      }

      // verifier contraintes
      if (organevalue == 1 && doseeq > 26) {
        this.showAlert(
          "Le guide des procédures de radiothérapie externe recommande de ne pas dépasser 26 Gy en dose totale pour le foie."
        );
      }
      if (organevalue == 1 && doseeq > 35) {
        this.showAlert(
          "Le guide des procédures de radiothérapie externe recommande de ne pas dépasser 35 Gy en dose moyenne pour chaque oeil."
        );
      }
      if (organevalue == 2 && doseeq > 45) {
        this.showAlert(
          "Le guide des procédures de radiothérapie externe recommande de ne pas dépasser 45 Gy en dose totale pour la moelle."
        );
      }
      if (organevalue == 2 && doseeq > 30) {
        this.showAlert(
          "Le guide des procédures de radiothérapie externe recommande de ne pas dépasser 30 Gy en dose moyenne pour la parotide."
        );
      }
      if (organevalue == 2 && doseeq > 50) {
        this.showAlert(
          "Le guide des procédures de radiothérapie externe recommande de ne pas dépasser 50 Gy en dose totale pour le grêle."
        );
      }
      if (organevalue == 3 && doseeq > 35) {
        this.showAlert(
          "Le guide des procédures de radiothérapie externe recommande de ne pas dépasser 35 Gy en dose totale pour le coeur."
        );
      }
      if (organevalue == 3 && doseeq > 20) {
        this.showAlert(
          "Le guide des procédures de radiothérapie externe recommande de ne pas dépasser 20 Gy en dose totale pour chaque rein."
        );
      }
      if (organevalue == 3 && doseeq > 50) {
        this.showAlert(
          "Le guide des procédures de radiothérapie externe recommande de ne pas dépasser 50 Gy en dose totale pour le tronc cérébral."
        );
      }
      console.log(doseeq);
      return Math.round(doseeq * 100) / 100;
    } else {
      return null;
    }
  }
}
</script>
