<template>
  <div id="page-wrapper">
    <div id="header">
      <!-- Inner -->
      <div class="inner">
        <header>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Tourney:ital,wght@1,100&display=swap" rel="stylesheet" />
          <h1>
            <a href="index.html" id="logo"><strong>Crawlr</strong></a>
          </h1>
          <hr />
          <p>Ready to party?!</p>
        </header>
        <footer>
          <!-- <a href="#banner" class="button circled scrolly">Let's do it!</a> -->
        </footer>
      </div>

      <!-- Nav -->
      <nav id="nav">
        <ul>
          <!-- <li><a href="index.html">Home</a></li> -->
          <li>
            <a href="#">Menu</a>
            <ul>
              <li><a href="/signup">Signup</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/bars">All Bars</a></li>
              <li><a href="/crawls">All Crawls</a></li>
              <li><a href="/crawls/new">New Crawl</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div class="container">
        <div v-if="flashMessage" v-on:click="flashMessage = null" class="alert alert-success" role="alert">
          {{ flashMessage }}
        </div>
      </div>
    </div>
    <router-view />
    <div id="footer-no">
      <div class="container">
        <div class="row"></div>
        <!-- <hr /> -->
        <div class="row">
          <div class="col-12">
            <!-- Contact -->

            <!-- Copyright -->
            <!-- <div class="copyright"> -->
            <!-- <ul class="menu">
                  <li>&copy; Untitled. All rights reserved.</li>
                  <li>
                    Design:
                    <a href="http://html5up.net">HTML5 UP</a>
                  </li>
                </ul> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      flashMessage: null,
    };
  },
};
</script>

<style>
#header {
  background-image: url("/assets/css/images/arrow.jpg");
}
#logo strong {
  color: white !important;
  letter-spacing: 0.07em;
  font-style: italic;
}
#a strong {
  color: white !important;
}

/* #p {
  font-style: ;
} */
</style>
