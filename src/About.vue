<!--
  - Copyright 2020 Arnaud Ruffin (arnaud.ruffin@orange.com)
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  -->

<template>
  <div class="text-right">
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="blue-grey darken-1"
            dark
            v-bind="attrs"
            v-on="on"
        >
          A propos
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          À propos
        </v-card-title>

        <v-card-text>

          <br/>
          <h3>Le modèle ILQ</h3>

          <p>Le modèle linéaire-quadratique est utilisé pour évaluer l’effet du fractionnement sur les
            tissus sains en radiothérapie.</p>

          <p>Il utilise un paramètre α, correspondant à la pente initiale de la courbe de survie
            cellulaire et un paramètre β décrivant l’inflexion secondaire de la courbe.</p>

          <p>Chaque type de tissu est donc caractérisé par deux paramètres α et β, dont le rapport α/β
            est inversement proportionnel à la sensibilité aux variations du fractionnement :</p>
          <ul>
            <li>un rapport α/β élevé (α/β &gt; 10 Gy) traduit une faible sensibilité aux modifications
              du fractionnement et caractérise généralement les tumeurs et les tissus sains responsables des effets
              aigus de l’irradiation : les doses totales « iso-effet » varient peu en fonction du fractionnement.
            </li>

            <li>un rapport α/β bas caractérise les tissus sensibles (α/β &lt; 10 Gy) aux variations du
              fractionnement à l’origine des effets secondaires tardifs.
            </li>
          </ul>


          <br/>
          <h3>Conditions d'utilisation et limites</h3>


          <p>Le modèle linéaire-quadratique est utilisé pour évaluer l’effet du fractionnement sur les
            tissus sains en radiothérapie.</p>
          <p>Il utilise un paramètre α, correspondant à la pente initiale de la courbe de survie
            cellulaire et un paramètre β décrivant l’inflexion secondaire de la courbe.</p>
          <p>Chaque type de tissu est donc caractérisé par deux paramètres α et β, dont le rapport α/β
            est inversement proportionnel à la sensibilité aux variations du fractionnement :</p>
          <ul>
            <li>un rapport α/β élevé (α/β &gt; 10 Gy) traduit une faible sensibilité aux modifications
              du fractionnement et caractérise généralement les tumeurs et les tissus sains responsables des effets
              aigus de l’irradiation : les doses totales « iso-effet » varient peu en fonction du fractionnement.
            </li>
            <li>un rapport α/β bas caractérise les tissus sensibles (α/β &lt; 10 Gy) aux variations du
              fractionnement à l’origine des effets secondaires tardifs.
            </li>
          </ul>

          <br/>
          <h3>
            Mentions légales
          </h3>

          <p>Ce site est une version modernisée des éléments trouvés sur <a>http://www.sfjro.fr/ilq/fr/</a>. </p>
          <p>Le code source de cette application est disponible sur le site <a>https://github.com/arnaudruffin/ILQ</a>,
            sous <a href="https://opensource.org/licenses/MIT">licence MIT</a></p>
          <p>La responsabilité des administrateurs et des auteurs du site ne peut, en aucune manière, être engagée quant
            au contenu des informations figurant sur ce site ou aux conséquences pouvant résulter de leur utilisation ou
            interprétation. Les administrateurs ne sont en aucun cas responsables de tous dysfonctionnements occasionnés
            en relation avec l’utilisation de quelque nature que ce soit du site.</p>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";


@Component
export default class About extends Vue {

  dialog = false;


}
</script>
