<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6">
          <h1>Algemene voorwaarden</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            aperiam quidem quasi nisi id fugit, hic earum inventore libero,
            eligendi, soluta nostrum repellendus! Repudiandae error incidunt
            neque dicta inventore pariatur?
          </p>

          <router-link :to="{ name: 'index' }" class="btn btn-primary"
            >Terug naar Home</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "terms",
};
</script>

<style lang="scss" scoped>
</style>