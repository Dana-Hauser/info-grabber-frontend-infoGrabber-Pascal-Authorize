<script>
	import Einstellungen from "./../modal/einstellungen.svelte";
    import Logo from "../Bilder/infoGrabber_Logo.svg";
    import einstellungenOpen from "../Bilder/icons/adjust-filled-16-white.svg";
    import adjust_logout from "./../Bilder/icons/logout-16-white.svg";

	import { browser } from "$app/env";
    import Popup from "./../modal/popup.svelte";
    import closeicon from "./../Bilder/icons/close-icon.svg";
    import Icon from "./../Bilder/icons/user-filled-48-white.svg";

    let ProfilOffen = false
    let EinstellungenOffen = false
    //einstellungen_öffnen(browser)

    function header_profil_anzeigen(){
        console.log("a")
        ProfilOffen = true
    }
    function header_profil_verstecken(){
        ProfilOffen = false
    }
    function logout(){
        alert("Logout")
    }
    function login(){
       
    }
    function einstellungen_öffnen(){
        document.querySelector('groupui-modal')['displayed'] = true
    }

    function einstellungen_schließen(){
        document.querySelector('groupui-modal')['displayed'] = false
    }

    function profil_schließen(){
        document.querySelector('groupui-modal')['displayed'] = false
    }

	function sidebarselect(){
		if(browser){
		var aktuellselect= document.getElementById("einstellungen_selected").innerHTML

		if(aktuellselect!=zahl){
			document.getElementById("einstellungen_select_"+aktuellselect).style.backgroundColor=""
			document.getElementById("einstellungen_selected_"+aktuellselect).style.display="none"
		}
		document.getElementById("einstellungen_select_"+zahl).style.backgroundColor="#00354d"
		document.getElementById("einstellungen_selected_"+zahl).style.display="block"
		document.getElementById("einstellungen_selected").innerHTML = zahl
	}}

	function passwortändern(){
		if(browser){
		var passwort1 = document.getElementById("passwortwechseln1").value
		var passwort2 = document.getElementById("passwortwechseln2").value
		var passwortleer = document.getElementById("passwortwechseln2").value

		if(passwort1 == passwort2){
			notify("success", "Passwort passt")
		}
		else if(passwort1==passwortleer){
			notify("danger", "Passwort 1 bitte eingeben")
		}
		else if(passwort2==passwortleer){
			notify("danger", "Passwort 2 bitte eingeben")
		}
		else{
			notify("danger", "Passwort stimmt nicht überein")
		}
	}}

	function nummerändern(){
		if(browser){
		var nummer = document.getElementById("nummerwechseln").value
		var inputleer = document.getElementById("passwortwechseln2").value
		
		if(nummer==inputleer){
			notify("danger", "Nummer bitte eingeben")
		}
		else{
			notify("success", "Nummer geändert")
		}
	}}

	function notify(){
		if(browser){
		document.getElementById("einstellungen_notification").style.display ="block"
		setTimeout(function(){
			document.getElementById("einstellungen_notification").style.display ="none"
		},3000);
		notificationstyle=art
		notificationinhalt=inhalt
	}}

	function sidebarselect1(){
		sidebarselect(1)
	}
	function sidebarselect2(){
		sidebarselect(2)
	}
	function sidebarselect3(){
		sidebarselect(3)
	}
	function sidebarselect4(){
		sidebarselect(4)
	}
	function sidebarselect5(){
		sidebarselect(5)
	}

	var notificationstyle="success"
	var notificationinhalt="success"

    //Post Request
    import { page } from '$app/stores';

    let raw_url = $page.url.search;
    let code = raw_url.substring(6);

    let current_path = $page.url.pathname;


    let cookie = "XSRF-TOKEN=bd3b28e8-7221-464b-a2b7-cd1fe4979c19";
    let authorization = "M2kyc3AyYnVlM2o4MHFrZXI4amVlOGhiMXE6MWRjN3JoYjQwZDVmZm8wb25sZ3QzNm4ycDFvamRlc2lybWNtMzFqNWgycWFmcnQ2M3BsNg";

    if($page.url.pathname == "authorize"){
        submit();
    }

    function submit(){
       //event.preventDefault();

        const dataArray = new FormData();
        dataArray.append("cookie", cookie);
        dataArray.append("authorization", authorization);
        dataArray.append("code", code);

        fetch("https://infograbber.auth.eu-west-1.amazoncognito.com/oauth2/token", {
        method: "POST",
        headers: [["Content-Type", "application/x-www-form-urlencoded"]],
        body: dataArray
        })
        .then(response => {
            // Successfully uploaded
            console.log("upload successfully");
        })
        .catch(error => {
            // Upload failed
            console.log("upload failed");
        });
    }


</script>

<main>
<div style="height:64px"></div>
<groupui-header class="hydrated"> 

    <!-- svelte-ignore a11y-missing-attribute -->
    <groupui-headline style="margin-right: 5%;"heading="h5" class="hydrated"><a class="link" href="./"><img src = {Logo} style="width: 250px;"></a></groupui-headline>
    <div>
        <a class="link" href="./Faq"><div class="header_item">FAQ</div></a>
        <a class="link" href="./projekte"><div class="header_item">Projekte</div></a>
        <div class="header_item">Sonstiges</div>   
    </div>
    <div class="tooltip_rahmen" style="width: 350px; right: 15px; position: fixed;">
        <!--<div on:click={()=>header_profil_anzeigen()} style="width: 350px; height: 350px; margin: -15px; right: 35px; position: fixed;">
            <groupui-avatar class="tooltip_rahmen" theme="vwag" ></groupui-avatar>
        </div>-->
   
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <div on:click={header_profil_anzeigen}><img alt="Bild" src="{Icon}" class="user-filled-48-white.png" style="position: absolute; height: 40px; width: 40px; top: -20px; bottom: 5px; right: 5px;"></div>

        {#if ProfilOffen}

        <span style="width: 280px; margin-top: 16%; margin-left: 16%; "id="header_profil" class="tooltip_popup box1" >

            <div on:click={header_profil_verstecken}><img alt="Bild" src="{closeicon}" class="icon_element2"></div>

            <groupui-headline heading="h3" class="schriftfarbe">Username</groupui-headline>
            {#if current_path != "/authorize"}
            <a sveltekit:prefetch href="https://infograbber.auth.eu-west-1.amazoncognito.com/login?client_id=3i2sp2bue3j80qker8jee8hb1q&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/authorize" style="text-decoration:none;"><img alt="Bild" src="{adjust_logout}" class="icon_element"><div class="text_mittig"><groupui-headline heading="h4" class="hydrated">Login</groupui-headline></div></a>
            {/if}
            {#if current_path == "/authorize"}
            <a sveltekit:prefetch href="https://infograbber.auth.eu-west-1.amazoncognito.com/logout?client_id=3i2sp2bue3j80qker8jee8hb1q&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000" style="text-decoration:none;"><img alt="Bild" src="{adjust_logout}" class="icon_element"><div class="text_mittig"><groupui-headline heading="h4" class="hydrated">Logout</groupui-headline></div></a>
            <!--<div on:click={logout}><img alt="Bild" src="{adjust_logout}" class="icon_element"><div class="text_mittig"><groupui-headline heading="h4" class="hydrated">Logout</groupui-headline></div></div>-->
            {/if}
            <div on:click={einstellungen_öffnen}><img alt="Bild" src="{einstellungenOpen}" class="icon_element"><div class="text_mittig"><groupui-headline heading="h4" class="hydrated">Einstellungen</groupui-headline></div></div>
        </span>
        {/if}

        <p>{code}</p>
        <!--<p>{current_path}</p>-->

        <groupui-modal id="EinstellungenFenster" theme="vwag">
                <div on:click={einstellungen_schließen} class="closedialog">
                <p style="display: table-cell; vertical-align: middle;">X</p></div>

            <Einstellungen/>
                </groupui-modal>

         <!--<Popup opentext = "Popup öffnen">
            <groupui-notification dismissible="false" style="display:none; position:fixed;" id="einstellungen_notification" severity="{notificationstyle}">
                {notificationinhalt}
            </groupui-notification>
            
            
                <div on:load={sidebarselect1}>
                    <div class="einstellungen-side-bar">
                        <div style="display: none" id="einstellungen_selected">1</div>
                        <div on:click={sidebarselect1} id="einstellungen_select_1" class="einstellungen-side-bar-elements">Einstellungen</div>
                        <div on:click={sidebarselect2} id="einstellungen_select_2" class="einstellungen-side-bar-elements">Passwort zurücksetzen</div>
                        <div on:click={sidebarselect3} id="einstellungen_select_3" class="einstellungen-side-bar-elements">Handynummer ändern</div>
                        <div on:click={sidebarselect4} id="einstellungen_select_4" class="einstellungen-side-bar-elements">User Settings</div>
                        <div on:click={sidebarselect5} id="einstellungen_select_5" class="einstellungen-side-bar-elements">User Settings</div>
                    </div>	
                    <div style="display:block" id="einstellungen_selected_1" class="einstellungen-selected">
                        <p>default</p>
            
            
                    </div>
                    <div id="einstellungen_selected_2" class="einstellungen-selected">
                        <p>Passwort zurücksetzen</p>
                        <groupui-input on:change={passwortändern}  id="passwortwechseln1" placeholder="Passwort123" maxlength="16" pattern="[A-Za-z]{3}" inverted="false" type="password">
                            <span slot="label">neues Passwort eingeben</span>
                        </groupui-input>
                        <groupui-input on:change={passwortändern} id="passwortwechseln2" placeholder="Passwort123" maxlength="16" pattern="[A-Za-z]{3}" inverted="false" type="password">
                            <span slot="label">Passwort wiederholen</span>
                        </groupui-input>
                        <groupui-input id="passwortleer" style="display: none">
                        </groupui-input>
            
                    </div>
                    <div id="einstellungen_selected_3" class="einstellungen-selected">
                        <p>Handynummer ändern</p>
                        <groupui-input on:change={nummerändern} id="nummerwechseln" placeholder="12345678" maxlength="16" inverted="false" type="number">
                            <span slot="label">neue Nummer eingeben</span>
                        </groupui-input>
            
                    </div>
                    <div id="einstellungen_selected_4" class="einstellungen-selected">
                        <p>4</p>
            
            
                    </div>
                    <div id="einstellungen_selected_5" class="einstellungen-selected">
                        <p>5</p>
            
            
                    </div>
                </div>
            <br>
        </Popup>-->

    </div> 

</groupui-header>
</main>
