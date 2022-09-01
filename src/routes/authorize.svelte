<script>
	import {onMount} from "svelte";
	import Header from "../components/vorlagen/Header.svelte";
	import Footer from "../components/vorlagen/Footer.svelte";
	import Groupui from "../components/vorlagen/Groupui.svelte";
	import "./app.css";
</script>

<main>
    <Groupui/>
	<Header/>
    <h2>Erfolgreich!</h2>
    <p>Sie sind autorisiert!</p>
    <a href="https://infograbber.auth.eu-west-1.amazoncognito.com/logout?client_id=3i2sp2bue3j80qker8jee8hb1q&logout_uri=http://localhost:3000/index.html">Log out</a>

    <Footer/>  
</main>

<style>

</style>