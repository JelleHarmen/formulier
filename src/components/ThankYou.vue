<template>
  <div>
    <h3>
      <span v-if="form_data.surname"
        >Hallo <span v-if="form_data.prefix">{{ form_data.prefix }}</span>
        {{ form_data.surname }},</span
      >
      Bedankt voor uw inschrijving.
    </h3>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nulla
      reiciendis omnis voluptates, a accusamus eius veritatis blanditiis
      accusantium! Eligendi totam sequi, quas blanditiis quis quam nemo sunt
      necessitatibus facere.
    </p>
  </div>
</template>

<script>
// form_data data
import form_data from "../config/form_data";

export default {
  name: "thank-you",
  data() {
    return {
      form_data,
    };
  },
};
</script>

<style lang="scss" scoped></style>
