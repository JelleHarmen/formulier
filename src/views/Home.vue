<template>
  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-7 col-xl-6 py-3">
          <div class="shadow rounded overflow-hidden">
            <header class="bg-header bg-cover p-3">
              <h5 class="text-white">Formulier</h5>
            </header>
            <div class="p-3 p-lg-4">
              <router-view />
            </div>
          </div>
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
header {
  min-height: 120px;
  &.bg-header {
    background: url("../assets/background-space.jpg") no-repeat center center;
  }
}
</style>
