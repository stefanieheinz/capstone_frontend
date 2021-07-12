<template>
  <div id="app">
    <div id="page-wrapper">
      <div id="header">
        <!-- Inner -->
        <div class="inner">
          <header>
            <h1><a href="index.html" id="logo">Crwl</a></h1>
            <hr />
            <p>Ready to party?!</p>
          </header>
          <footer>
            <a href="#banner" class="button circled scrolly">Let's do it!</a>
          </footer>
        </div>

        <!-- Nav -->
        <nav id="nav">
          <ul>
            <li><a href="index.html">Home</a></li>
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
      </div>
      <router-view />
      <div id="footer">
        <div class="container">
          <div class="row">
            <!-- Tweets -->

            <!-- Posts -->

            <!-- Photos -->
          </div>
          <hr />
          <div class="row">
            <div class="col-12">
              <!-- Contact -->

              <!-- Copyright -->
              <div class="copyright">
                <ul class="menu">
                  <li>&copy; Untitled. All rights reserved.</li>
                  <li>
                    Design:
                    <a href="http://html5up.net">HTML5 UP</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
