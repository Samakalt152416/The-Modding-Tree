addLayer("c", {
    name: "Genesis", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "[-3]", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#0c398d",
    requires: new Decimal(0.001), // Can be a function that takes requirement increases into account
    resource: "Consistency", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    upgrades: {
        11: {
        title: "The Genesis",
        description: "x2 Skill gain",
        cost: new Decimal(0.001),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        },
          12: {
        title: "The Base Increaser",
        description: "+0.0001 base gain",
        cost: new Decimal(0.0025),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        },

         13: {
        title: "Advancing",
        description: "Skill boosts themselves [(log10(x+1)+1)^25, Cap: x3]",
        cost: new Decimal(0.00625),
         currencyInternalName: "points",
        currencyDisplayName: "skills",
        effect() {
return player.points.add(1).log10().add(1).pow(25).min(3)
        },
        effectDisplay() {return "x"+format(upgradeEffect(this.layer, this.id))}
    },
         14: {
        title: "More increase",
        description: "+0.0002 base skill gain",
        cost: new Decimal(0.015625),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        },
          15: {
        title: "More increase",
        description: "+0.0001 base skill gain, x1.5 Skill gain and introduces reset layer",
        cost: new Decimal(0.0390625),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        },
              21: {
        title: "Recursive",
        description: "Skill boosts Attempts and itself [log10(10x+1)+1]^0.5",
        cost: new Decimal(0.5),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        
        effect() {return player.points.mul(10).add(1).log10().add(1).pow(0.5)},
          effectDisplay() {return "x"+format(upgradeEffect(this.layer, this.id))},
         unlocked() {return hasMilestone("r", 3)},
        },
          22: {
        title: "First Skill",
        description: "Attempts also add base skill gain [x+1]^0.7/10000 [Cap: +1]",
        cost: new Decimal(1),
        currencyInternalName: "points",
        currencyDisplayName: "skill",
        effect() {return player.r.points.add(1).pow(0.7).div(10000)},
       effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))+" base"},
         unlocked() {return hasMilestone("r", 3)},
        },
          23: {
        title: "Exponents all of a sudden?",
        description: "^1.01 Skill gain, here's another x3 Skill gain [Order: + > x > ^ > ^^ ...]",
        cost: new Decimal(2),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("r", 3)},
        },
   24: {
        title: "filler",
        description: "x1.25 Skill gain",
        cost: new Decimal(3),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        unlocked() {return hasMilestone("r", 3)},
        },
        25: {
        title: "The REAL beginning",
        description: "x3 Skill gain, At this point, The journey begins for real.",
        cost: new Decimal(5),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("r", 3)},
        },
        31: {
        title: "Recovery",
        description: "^1.025 Skill gain if gain multiplier is >1e4 [or 1/s], Otherwise: x3 Skill gain",
        cost: new Decimal(0.05),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("b", 2)},
        },
         32: {
        title: "Unexplainable Victory",
        description: "^2 recursive's effect",
        cost: new Decimal(1e3),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("b", 2)},
        },
       
    },
    
     autoUpgrade() {return hasMilestone("b",1)},
    infoboxes: {
        a: {
        title: "The Genesis...",
        body() { return "You found yourself in a reality that were once third dimension... now was collapsed to two dimensions, Thus also comes with pre-TFirD progression to introduce the seemingly 'endless' journey... [Yes, this is an offical port of SamDBI v4, as this is made by the owner of ROBLOX's SamDBI v4, Call this SamDBI v5: Outblox-platformized if you want, But this will be similar to SamDBI v4, Except the introductory]" },
        
    },
    },
    layerShown() {return true}
})

addLayer("r", {
    name: "Retrying", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "[-2]", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#ff9900",
    branches: "c",
    requires: new Decimal(0.1), // Can be a function that takes requirement increases into account
    resource: "Attempts", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("c", 21)) mult = mult.mul(upgradeEffect("c", 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
   
    milestones: {
    1: {
        requirementDescription: "Attempt #2 - Existence's Buttons",
        effectDescription: "x3 Skill gain, Unlock Consistency buttons, Consistency will boost skill gain by 1.3^[log10(x+1)^0.9]",
        done() { return player[this.layer].points.gte(2) }
    },
    2: {
        requirementDescription: "Attempt #3 - Trial and Error",
        effectDescription: "Attempts boost Consistency [log10(x+1)^1.5+1], x2 Skill gain",
        done() { return player[this.layer].points.gte(3) }
    },
    3: {
        requirementDescription: "Attempt #5 - Post-Genesis and The Proper Beginning",
        effectDescription: "Class -1 is visible, x1.5 Skill gain, and New Genesis Upgrades",
        done() { return player[this.layer].points.gte(5) }
    },
    4: {
        requirementDescription: "Attempt #25",
        effectDescription: "Change ^25 to ^2 But the cap is removed entirely and softcapless",
        done() { return player[this.layer].points.gte(25) }
    },
     4: {
        requirementDescription: "Attempt #100",
        effectDescription: "Attempt boosts 'Recursion' by: ^[log10(x+1)^0.8+1]",
        done() { return player[this.layer].points.gte(100) }
    },
},
    clickables: {
        11: {
display() {return "Genesis | 0.0001 Skill for 1 Consistency"},
canClick() {return player.points.gte(0.0001)},
onClick() {
    player.points = player.points.sub(0.0001),
    player.c.points = player.c.points.add(1)
},
onHold() {
    player.points = player.points.sub(0.0001),
    player.c.points = player.c.points.add(1)
},
        },
        12: {
display() {return "Blissful | 0.01 Skill for 6.25 Consistency"},
canClick() {return player.points.gte(0.01)},
onClick() {
    player.points = player.points.sub(0.01),
    player.c.points = player.c.points.add(6.25)
},
onHold() {
    player.points = player.points.sub(0.01),
    player.c.points = player.c.points.add(6.25)
},
        },

 13: {
display() {return "Before The First Difficulty | 1 Skill for 39.06 Consistency"},
canClick() {return player.points.gte(1)},
onClick() {
    player.points = player.points.sub(1),
    player.c.points = player.c.points.add(39.06)
},
onHold() {
    player.points = player.points.sub(1),
    player.c.points = player.c.points.add(39.06)
},
  },
       

},

    infoboxes: {
        lore: {
        title: "Retrying",
        body() { return "After about 2-3 minutes, The player has reached the first reset layer, Resets everything to retry, However returning a boost, and now this is where 'difficulty buttons' begin to appear at right here. " },
        
    },
    },
    layerShown() {return true}
})

addLayer("b", {
    name: "Class Negative A", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "[-1A]", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#258300",
    branches: "r",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Definitions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 4.3215, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)

    milestones: {
    1: {
        requirementDescription: "Definition #1 - Rating",
        effectDescription: "x2 Skill, +0.001 base skill gain, x2 Attempt gain, Automate Genesis, Define 'rating' as log10(Skill+1)^0.75, And unlock difficulty buttons",
        done() { return player[this.layer].points.gte(1) }
    },
    2: {
        requirementDescription: "Definition #2 - Winning",
        effectDescription: "Define 'winning' as a sub-layer",
        done() { return player[this.layer].points.gte(2) }
    },
     3: {
        requirementDescription: "Definition #3 - Progression",
        effectDescription: "Every definition gives 30%(c) skill gain, (c) is defined as compounding",
        done() { return player[this.layer].points.gte(3) }
    },
    
},
    infoboxes: {
        lore: {
        title: "The Actual Beginning",
        body() { return "The grind begins here and now, You have reached the first actual difficulty out of potentially thousands, and you have scratched out the surface [aka. The very basic of the mechanics]" },
        
    },
    },
    layerShown() {return true}
})
