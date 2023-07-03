"use strict";var color,darkButton=document.getElementById("dark"),lightButton=document.getElementById("light"),colorModeFromLocalStorage=function(){return localStorage.getItem("colorMode")},setDarkMode=function(){document.querySelector("body").classList="dark",localStorage.setItem("colorMode","dark")},setLightMode=function(){document.querySelector("body").classList="light",localStorage.setItem("colorMode","light")},radioButtons=document.querySelectorAll(".toggle__wrapper input");radioButtons.forEach((function(o){o.addEventListener("click",(function(o){darkButton.checked?setDarkMode():setLightMode()}))}));var colorModeFromPreferences=function(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"},loadAndUpdateColor=function(){"dark"==(color=colorModeFromLocalStorage()||colorModeFromPreferences())?darkButton.click():lightButton.click()};window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(function(o){o.matches?darkButton.click():lightButton.click()})),loadAndUpdateColor();