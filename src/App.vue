<template>
  <div id="app" class="push-bottom">
    <nav></nav>

    <main>
      <router-view />
    </main>

    <footer class="text-center">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p class="text-muted">
              <small
                >Gemaakt door
                <a href="https://jelleharmen.com" target="_blank"
                  >JelleHarmen</a
                ></small
              >
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import "@/styles/includes";
@import "@/styles/bootstrap";
@import "@/styles/styles";
</style>
