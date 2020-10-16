<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="form-group col-6 col-md">
          <label for="firstname">Voorletters</label>
          <input
            v-model="form_data.firstname"
            data-firstname
            type="text"
            class="form-control"
            id="firstname"
            placeholder="Bv. P.J"
            pattern="^[a-zA-Z.]+$"
            required="true"
          />
        </div>
        <div class="form-group col-6 col-md-3">
          <label for="prefix">Tussenv.</label>

          <input
            v-model.trim="form_data.prefix"
            type="text"
            class="form-control"
            id="prefix"
            placeholder="Bv. van"
          />
        </div>
        <div class="form-group col">
          <label for="surname">Achternaam</label>

          <input
            v-model.trim="form_data.surname"
            type="text"
            class="form-control"
            id="surname"
            placeholder="Bv. de Jong"
            required="true"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="zipcode">Postcode</label>

          <input
            v-model.lazy="form_data.zipcode"
            type="text"
            class="form-control"
            id="zipcode"
            placeholder="Bv. 2000AB"
            pattern="^[1-9][0-9]{3}\s?[a-zA-Z]{2}$"
            required="true"
          />

          <div v-if="api_error__zipcode" class="badge badge-danger">
            Postcode en huisnr. komen niet overeen
          </div>
        </div>

        <div class="form-group col">
          <label for="house_number">Huisnr.</label>

          <input
            v-model.lazy="form_data.house_number"
            type="tel"
            class="form-control"
            id="house_number"
            placeholder="Bv. 2"
            pattern="[0-9]+"
            required="true"
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
            v-model.trim="form_data.street"
            type="text"
            class="form-control"
            id="street"
            disabled="true"
            required="true"
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
            v-model.trim="form_data.city"
            type="tel"
            class="form-control"
            id="city"
            disabled="true"
            required="true"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="email">E-mail</label>
          <input
            v-model.trim="form_data.email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Bv. p.j@dejong.nl"
            required="true"
          />
        </div>
      </div>

      <button class="btn btn-success btn-lg btn-block">
        <span v-show="!api_loading__post_form">Versturen</span>
        <span v-show="api_loading__post_form">Formulier wordt verstuurd..</span>
      </button>
    </form>

    <div class="message d-none" v-if="form_data.firstname">
      {{ form_data.firstname }}
    </div>
  </div>
</template>

<script>
// axios api
import axios from "axios";

// form data storage
import form_data from "@/config/form_data";

export default {
  name: "FormpageAlt",
  data() {
    return {
      form_data,
      api_loading__zipcode: false,
      api_loading__post_form: false,
      api_loaded__zipcode: false,
      api_error__zipcode: false,
      submitted: false,
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

      // reset api erro
      this.api_error__zipcode = false;

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
      this.api_error__zipcode = true;

      // wipe city and street
      this.form_data.city = "";
      this.form_data.street = "";
    },
    submitForm() {
      // if street and city are empty
      if (!this.form_data.street && !this.form_data.city) {
        this.api_error__zipcode = true;

        // else street and city contains data
      } else {
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
