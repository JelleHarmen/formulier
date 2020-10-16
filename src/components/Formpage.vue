<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="form-group col-6 col-md">
          <label for="firstname">Voorletters</label>

          <input
            v-model.trim="$v.form_data.firstname.$model"
            :class="{
              'border-danger': $v.form_data.firstname.$error,
              'border-success':
                $v.form_data.firstname.$model && !$v.form_data.firstname.$error,
            }"
            data-firstname
            type="text"
            class="form-control"
            id="firstname"
            placeholder="Bv. P.J"
            pattern="^[a-zA-Z.]+$"
          />
        </div>
        <div class="form-group col-6 col-md">
          <label for="prefix">Tussenv.</label>

          <input
            v-model.trim="$v.form_data.prefix.$model"
            :class="{
              'border-danger': $v.form_data.prefix.$error,
              'border-success':
                $v.form_data.prefix.$model && !$v.form_data.prefix.$error,
            }"
            type="text"
            class="form-control"
            id="prefix"
            placeholder="Bv. van"
          />
        </div>
        <div class="form-group col">
          <label for="surname">Achternaam</label>

          <input
            v-model.trim="$v.form_data.surname.$model"
            :class="{
              'border-danger': $v.form_data.surname.$error,
              'border-success':
                $v.form_data.surname.$model && !$v.form_data.surname.$error,
            }"
            type="text"
            class="form-control"
            id="surname"
            placeholder="Bv. de Jong"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="zipcode">Postcode</label>

          <input
            v-model.lazy="$v.form_data.zipcode.$model"
            :class="{
              'border-danger': $v.form_data.zipcode.$error,
              'border-success':
                $v.form_data.zipcode.$model && !$v.form_data.zipcode.$error,
            }"
            type="text"
            class="form-control"
            id="zipcode"
            placeholder="Bv. 2000AB"
            pattern="^[1-9][0-9]{3}\s?[a-zA-Z]{2}$"
          />

          <div class="badge badge-danger" v-if="$v.form_data.street.$error">
            Ongeldige postcode / huisnummer
          </div>
        </div>

        <div class="form-group col">
          <label for="house_number">Huisnr.</label>

          <input
            v-model.lazy="$v.form_data.house_number.$model"
            :class="{
              'border-danger':
                $v.form_data.house_number.$error || $v.form_data.street.$error,
              'border-success':
                $v.form_data.house_number.$model &&
                !$v.form_data.house_number.$error,
            }"
            type="tel"
            class="form-control"
            id="house_number"
            placeholder="Bv. 2"
            pattern="[0-9]+"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-12 col-md">
          <label for="street"
            >Straat

            <font-awesome-icon
              icon="spinner"
              size="xs"
              spin
              v-if="api_loading__zipcode"
            />
          </label>

          <input
            v-model.trim="$v.form_data.street.$model"
            type="text"
            class="form-control"
            id="street"
            disabled="true"
          />
        </div>

        <div class="form-group col-12 col-md">
          <label for="city"
            >Stad
            <font-awesome-icon
              icon="spinner"
              size="xs"
              spin
              v-if="api_loading__zipcode"
            />
          </label>

          <input
            v-model.trim="$v.form_data.city.$model"
            type="tel"
            class="form-control"
            id="city"
            disabled="true"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="email">E-mail</label>
          <input
            v-model.trim="$v.form_data.email.$model"
            :class="{
              'border-danger': $v.form_data.email.$error,
              'border-success':
                $v.form_data.email.$model && !$v.form_data.email.$error,
            }"
            type="email"
            class="form-control"
            id="email"
            placeholder="Bv. p.j@dejong.nl"
          />
        </div>
      </div>

      <button class="btn btn-success btn-lg btn-block">
        <span v-show="!api_loading__post_form">Versturen</span>
        <span v-show="api_loading__post_form">Formulier wordt verstuurd..</span>
      </button>
    </form>

    <p class="text-center pt-2 text-muted">
      <small
        >Door op versturen te klikken gaat u akkoord met de
        <router-link :to="{ name: 'terms' }">
          Algemene voorwaarden</router-link
        ></small
      >
    </p>
  </div>
</template>

<script>
// axios api
import axios from "axios";

// form data storage
import form_data from "@/config/form_data";

// form validators
import { required, email, minLength, numeric } from "vuelidate/lib/validators";

export default {
  name: "formpage",
  data() {
    return {
      form_data,
      api_loading__zipcode: false,
      api_loading__post_form: false,
    };
  },
  validations() {
    // All validation for inputs if required
    return {
      form_data: {
        firstname: {
          required,
        },
        prefix: {},
        surname: {
          required,
        },
        zipcode: {
          required,
          minLength: minLength(6),
        },
        house_number: {
          required,
          numeric,
        },
        city: {
          required,
        },
        street: {
          required,
        },
        email: {
          required,
          email,
        },
      },
    };
  },
  // watch if zipcode or housenumber has been changed.
  watch: {
    "form_data.zipcode": function() {
      this.updateStreetAndCity();
    },
    "form_data.house_number": function() {
      this.updateStreetAndCity();
    },
  },
  methods: {
    updateStreetAndCity() {
      // update street and zipcode if both exists
      if (this.form_data.zipcode && this.form_data.house_number) {
        // get the street and city from api function
        this.getStreetAndCity();
      }
    },

    // recieve aditional information using the zipcode
    // fill the city and street
    getStreetAndCity() {
      // api zipcode is loading
      this.api_loading__zipcode = true;

      // get the street and city from api using axios
      axios
        .get(
          `https://photon.komoot.de/api/?q=` +
            this.removeWhitespace(this.form_data.zipcode) +
            this.form_data.house_number
        )
        .then((response) => {
          // response city
          if (response.data.features[0].properties.city) {
            // fill the ciyt with cirty form api
            this.form_data.city = response.data.features[0].properties.city;
          }
          // response name == street
          if (response.data.features[0].properties.name) {
            // fill the street with name form api
            this.form_data.street = response.data.features[0].properties.name;
          }
        })
        .catch((error) => {
          // log errors (Disable in production)
          console.log(error);
          // ctach error
          this.errorStreetAndCity();
        })
        .finally(() => {
          // api is either doner loaded or failed
          this.api_loading__zipcode = false;
        });
    },
    errorStreetAndCity() {
      // Error wrong street and city

      // wipe city and street
      this.form_data.city = "";
      this.form_data.street = "";

      // touch the street input so it detects an error
      this.$v.form_data.street.$touch();
    },
    submitForm() {
      // touches the form to detect errors
      this.$v.form_data.$touch();

      // if no errors are founded
      if (!this.$v.form_data.$error) {
        // api for posting the form is loading
        this.api_loading__post_form = true;

        // Axios to post the api
        // send all from information to the server
        axios
          .post("https://mockbin.com/request?foo=bar&foo=baz", this.form)
          .then((response) => {
            console.log(response);

            // send the user to the thank-you page
            this.$router.push({
              name: "thank-you",
            });
          })
          .catch((error) => {
            // log errors (Disable in production)
            console.log(error);
            // message the user something went wrongs
            alert("formulier niet verzonden");
          })
          .finally(() => {
            // api is either doner loaded or failed
            this.api_loading__post_form = false;
          });
      }
    },
    removeWhitespace(value) {
      return value.replace(/ /g, "");
    },
  },
};
</script>
