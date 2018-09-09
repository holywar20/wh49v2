<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Warehouse 49</title>

	<!-- Style sheets -->
	<link rel="stylesheet" href="css/minicss.dark.css">
	<link rel="stylesheet" href="css/wh49style.css">

	<!-- Icon set from https://saeedalipoor.github.io/icono/ -->
	<link rel="stylesheet" href="css/icons.css">

	<!-- A library for random helper functions -->
	<script src="jslibs/warehouse-convenience-lib.js"></script>

	<!-- Now add core Vue -->
	<script src="https://unpkg.com/vue"></script>

	<!-- setting up services. -->
	<script src="singletons/config.js"></script>
	<script src="singletons/eventbus.js"></script>
	<script src="singletons/datasender.js"></script>
	<script src="singletons/cookies.js"></script>

	<!--  3rd party library to help with time & date handling on JS side. https://momentjs.com/ -->
	<script src="jslibs/moment-with-locales.min.js"></script>

	<!-- Bootstrap the app -->
	<script src="warehouse_app.js"></script>

	<!-- Now add in all my Vue components -->
	<!-- accessable by anyone -->
	<script src="maincomponents/whlogin.js"></script>
	<script src="maincomponents/whnewaccount.js"></script>
	<script src="maincomponents/whforgotpassword.js"></script>

	<!-- Needs JWT -->
	<script src="maincomponents/wheventspage.js"></script>
	<script src="maincomponents/whprofilepage.js"></script>
	<script src="maincomponents/whteams.js"></script>

	<!-- Needs admin access -->

</head>
<body>
<div id="main-container">  <!-- STATE object binds to this -->

	<header v-if="access" class="sticky align-center">
		<div class="justify">
			<div>
				<button class="logo-button">
					<a target="_blank" href="http://www.warehouse49.com/">
						<img src="images/Sticker-Small.png">
					</a>
				</button>

				<button v-on:click="gotoPage('WHEVENTS')" >
					<span class="icono-calendar"></span>&nbsp;Events
				</button>

				<button v-on:click="gotoPage('WHTEAMS')">
					<span class="icono-sitemap"></span>&nbsp;My Teams
				</button>
			</div>

			<div>
				<button v-on:click="gotoPage('WHPROFILE')">
					<span class="icono-user"></span>
				</button>

				<button v-on:click="logout()">
					<span class="icono-signOut"></span>
				</button>
			</div>
		</div>
	</header>

	<div class="page-container">
		<!-- Authorization Screens -->
		<whlogin
				v-if=" showView == 'WHLOGIN' ">
		</whlogin>

		<whnewaccount
				v-if=" showView == 'WHNEWACCOUNT' ">
		</whnewaccount>

		<whforgotpassword
				v-if=" showView == 'WHFORGOTPASSWORD' ">
		</whforgotpassword>

		<!-- User screens -->

		<wheventspage
				v-if=" showView == 'WHEVENTS' ">
		</wheventspage>

		<whprofilepage
				v-if=" showView == 'WHPROFILE' ">
		</whprofilepage>

		<whteams
				v-if=" showView== 'WHTEAMS' ">
		</whteams>
		<!-- Admin Screens -->

	</div>

	<footer>
		<div class="justify">
			<div style="display:block"> <!-- cancel  flexbox. Inline so it's super clear why I'm doing this. -->
				<div class="copyright">Warehouse49 &copy;2018</div>
				<div class="little-text"> A web application by Bryan C. Winter & Aaron Fadoff</div>
			</div>

			<div class="social-media-box">

			</div>
		</div>
	</footer>

</div>
</body>
</html>
