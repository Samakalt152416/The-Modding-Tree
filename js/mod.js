let modInfo = {
	name: "SamDBI V4 Again...",
	author: "samakal152416",
	pointsName: "Skill",
	modFiles: ["layers.js", "tree.js"],

	discordName: "samakal152416",
	discordLink: "https://discord.gg/samakal152416",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "ω",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>vω</h3><br>
		- Public SamDBI V4 Again Release<br>
		- ....`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
    let gain = new Decimal(0.0001)
	if (hasUpgrade("c", 12)) gain = gain.add(0.0001)
		if (hasUpgrade("c", 14)) gain = gain.add(0.0002)
if (hasUpgrade("c", 15)) gain = gain.add(0.0001)
	if (hasMilestone("b", 1)) gain = gain.add(0.001)
if (hasUpgrade("c", 22)) gain = gain.add(upgradeEffect("c", 22))

	if (hasUpgrade("c", 11)) gain = gain.mul(2)
	if (hasUpgrade("c", 13)) gain = gain.mul(upgradeEffect("c", 13))
	if (hasUpgrade("c", 15)) gain = gain.mul(1.5)
		if (hasUpgrade("c", 23)) gain = gain.mul(3)
if (hasMilestone("r", 1)) gain = gain.mul(3)
	effecta = player.c.points.add(1).log10().pow(0.9)
            expoef = new Decimal(1.3).pow(effecta)
	if (hasMilestone("r", 1)) gain = gain.mul(expoef)
	if (hasMilestone("r", 2)) gain = gain.mul(2)
	if (hasMilestone("r", 3)) gain = gain.mul(1.5)
		if (hasMilestone("b", 1)) gain = gain.mul(2)
			if (hasUpgrade("c", 24)) gain = gain.mul(1.25)
				if (hasUpgrade("c", 25)) gain = gain.mul(3)
					if (hasUpgrade("c", 21)) gain = gain.mul(upgradeEffect("c", 21))

					if (hasUpgrade("c", 23)) gain = gain.pow(1.01)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"[Endgame: 1k Skill]",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

