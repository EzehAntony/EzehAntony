


gsap.to(".gd1",  {"margin-top": "-100vh", duration: 1, opacity: 0})
gsap.to(".gd2",  {"margin-top": "-100vh",  duration: 1, delay: .4, opacity: 0})
gsap.to(".gd3",  {"margin-top": "-100vh", duration: 1, delay: .8, opacity: 0, onComplete: () => {$(".gsap").remove()}})
gsap.fromTo("header", {top: "-50%"}, {top: 0, delay: 1.2})


$(".menu").click(() => {
    gsap.fromTo("header ul", {top:0, left: "-100%", }, {opacity: 1, top:0, left: 0, duration: .8})
})
$(".exit").click(() => {
    gsap.to("header ul", {"top": "-250px", opacity: 0 })
})

$(".full button").click(() => {
    gsap.to(".full", {"margin-right": "-100%"})
})


$(".facebook").click(()=> {
    window.location ="https://www.facebook.com/anthony.ezeh.37017"
})
$(".instagram").click(()=> {
    window.location ="https://instagram.com/crayonne.o"
})
$(".twitter").click(()=> {
    window.location ="https://twitter.com/crayonne1"
})
$(".whatsapp").click(()=> {
    window.location ="https://wa.me/2349121186085?text=I20%love20%your20%work."
})