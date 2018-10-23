var keywords = localStorage.getItem("keywords");
var budget = localStorage.getItem("budget");
var selected = localStorage.getItem("selected");
$("#loadingTitle").text(selected.split(',')[0]);
var results = [];

var projectMaterials = {
    "https://www.instructables.com/id/HOW-TO-MAKE-a-EPOXY-RESIN-TABLE-TOP/": ["16 in hairpin legs", "countertop epoxy", "white paint", "panel round board"],
    "https://www.instructables.com/id/Make-a-Conference-Table-How-to-Cut-Breadboard-Ends/": ['120" x 9" x 1 1/2" red oak', 'Hairpin table legs'],
    "https://www.instructables.com/id/Make-Wall-Mounted-Box-Shelves/": ["22 mm wood plank", "10 mm tubillions",
        "Mounting adhesive",
        "adhesive",
        "10 X 10 mm wooden strip",
        "5 mm DM board",
        "Varnish",
        "Multipurpose primer",
        "Acrylic enamel"
    ],
    "https://www.instructables.com/id/Slats-Toy-Chest/": ["Bed slats",
        "Planks", "plywood", "wooden strips", "hinges", "brackets", "wood glue", "screws"
    ]
};

var materials = {
    "16 in hairpin legs": {
        title: "16 in. Black Steel 2-Rod Hairpin Leg (4-Pack)",
        price: 34.97,
        link: "https://www.homedepot.com/p/Crates-Pallet-16-in-Black-Steel-2-Rod-Hairpin-Leg-4-Pack-6420011004/305047738"
    },
    "countertop epoxy": {
        title: "The Tile Doctor 5 kg Starlike Crystal Glass Grout",
        price: 99.95,
        link: "https://www.homedepot.com/p/The-Tile-Doctor-5-kg-Starlike-Crystal-Glass-Grout-C-350-5kg/305045251"
    },
    "white paint": {
        title: "BEHR Premium Plus Ultra 5-gal. Medium Base Flat Low Voc Exterior Paint",
        price: 175.00,
        link: "https://www.homedepot.com/p/BEHR-Premium-Plus-Ultra-5-gal-Medium-Base-Flat-Low-Voc-Exterior-Paint-2485405/202301631"
    },
    "panel round board": {
        title: "1 in. x 36 in. x 3 ft. Pine Edge Glued Panel Round Board",
        price: 39.33,
        link: "https://www.homedepot.com/p/1-in-x-1-5-ft-x-1-5-ft-Pine-Edge-Glued-Panel-Round-Board-680435/202017011"
    },
    '120" x 9" x 1 1/2" red oak': {
        title: "1 in. x 39.5 in. x 11.5 in. Reclaimed Red Wine Soaked Wine Barrel Wood Wall Panel",
        price: 45.00,
        link: "https://www.homedepot.com/p/1-in-x-39-5-in-x-11-5-in-Reclaimed-Red-Wine-Soaked-Wine-Barrel-Wood-Wall-Panel-ABC-WNE-SOAK/301397727"
    },
    "Hairpin table legs": {
        title: "Standard 3/8 in. Dia 28 in. Raw Steel 2-Rod Hairpin Leg (Each Leg Sold Separately)",
        price: 17.99,
        link: "https://www.homedepot.com/p/Standard-3-8-in-Dia-28-in-Raw-Steel-2-Rod-Hairpin-Leg-Each-Leg-Sold-Separately-DIY-HL-38-28/301974087"
    },
    "22 mm wood plank": {
        title: "TrafficMASTER Hand scraped Saratoga Hickory 7 mm Thick x 7-2/3 in. Wide x 50-5/8 in. Length Laminate Flooring (24.17 sq. ft. / case)",
        price: 21.48,
        link: "https://www.homedepot.com/p/TrafficMASTER-Hand-scraped-Saratoga-Hickory-7-mm-Thick-x-7-2-3-in-Wide-x-50-5-8-in-Length-Laminate-Flooring-24-17-sq-ft-case-34089/204135461"
    },
    "10 mm tubillions": {
        title: "10 mm - 1.5 Zinc-Plated Metric Hex Nut (2 per Pack)",
        price: .96,
        link: "https://www.homedepot.com/p/10-mm-1-5-Zinc-Plated-Metric-Hex-Nut-2-per-Pack-803778/204274084"
    },
    "Mounting adhesive": {
        title: "Command Small, Medium and Large Assorted Refill Mounting Strip (16 per Pack)",
        price: 3.97,
        link: "https://www.homedepot.com/p/Command-Small-Medium-and-Large-Assorted-Refill-Mounting-Strip-16-per-Pack-17200CL-ES/205065860"
    },
    "adhesive": {
        title: "Titebond III 16 oz. Ultimate Wood Glue",
        price: 7.47,
        link: "https://www.homedepot.com/p/Liquid-Nails-10-oz-Extreme-Heavy-Duty-Adhesive-LN-907/205089262"
    },
    "10 X 10 mm wooden strip": {
        title: "1 in. x 3 in. x 8 ft. Furring Strip Board",
        price: 1.92,
        link: "https://www.homedepot.com/p/1-in-x-3-in-x-8-ft-Furring-Strip-Board-164704/100094214"
    },
    "5 mm DM board": {
        title: "7/16 in. x 48 in. x 8ft. Oriented Strand Board",
        price: 10.15,
        link: "https://www.homedepot.com/p/7-16-in-x-48-in-x-8ft-Oriented-Strand-Board-386081/202106230"
    },
    "Varnish": {
        title: "Citristrip 1/2 gal. Safer Paint and Varnish Stripping Gel",
        price: 19.97,
        link: "https://www.homedepot.com/p/Citristrip-1-2-gal-Safer-Paint-and-Varnish-Stripping-Gel-HCG73803T/100141801"
    },
    "Multipurpose primer": {
        title: "Zinsser PrimeCoat White Water-Based Interior Multi-Purpose Primer & Sealer",
        price: 59.92,
        link: "https://www.homedepot.com/p/Zinsser-PrimeCoat-5-gal-White-Water-Based-Interior-Multi-Purpose-Primer-Sealer-324259/302019741"
    },
    "Acrylic enamel": {
        title: "Rust-Oleum Automotive 12 oz. Acrylic Enamel Flat Black Spray Paint (6-Pack)",
        price: 34.74,
        link: "https://www.homedepot.com/p/Americana-Decor-8-oz-Warm-White-Satin-Enamel-Paint-ADSA03-98/300953692"
    },
    "Bed slats": {
        title: "Structures Adjustable Metal Bed Frame",
        price: 51.99,
        link: "https://www.homedepot.com/p/Instant-Foundation-Instant-Foundation-Full-Size-4-in-H-Low-Profile-Mattress-Foundation-123001-5030/300707097"
    },
    "Planks": {
        title: "WeatherShield 2 in. x 4 in. x 8 ft. #2 Prime Ground Contact Pressure-Treated Lumber",
        price: 4.77,
        link: "https://www.homedepot.com/p/WeatherShield-2-in-x-4-in-x-8-ft-2-Prime-Ground-Contact-Pressure-Treated-Lumber-253920/206967811"
    },
    "plywood": {
        title: "7/16 in. x 48 in. x 8ft. Oriented Strand Board",
        price: 10.15,
        link: "https://www.homedepot.com/p/7-16-in-x-48-in-x-8ft-Oriented-Strand-Board-386081/202106230"
    },
    "wooden strips": {
        title: "1 in. x 3 in. x 8 ft. Furring Strip Board",
        price: 1.92,
        link: "https://www.homedepot.com/p/1-in-x-3-in-x-8-ft-Furring-Strip-Board-164704/100094214"
    },
    "hinges": {
        title: "Everbilt 1 in. Zinc Plated Non-Removable Pin Narrow Utility Hinges (2-Pack)",
        price: 1.97,
        link: "https://www.homedepot.com/p/Everbilt-1-in-Zinc-Plated-Non-Removable-Pin-Narrow-Utility-Hinges-2-Pack-15161/202034166"
    },
    "brackets": {
        title: "Veranda Traditional Williamsburg Vinyl Rail Line Bracket Kit (4-Pack)",
        price: 12.97,
        link: "https://www.homedepot.com/p/Crown-Bolt-10-in-x-12-in-White-Shelf-Bracket-15254/202034279"
    },
    "wood glue": {
        title: "Gorilla 8 oz. Wood Glue",
        price: 3.97,
        link: "https://www.homedepot.com/p/Gorilla-8-oz-Wood-Glue-62000/100672167"
    },
    "screws": {
        title: "Deck Mate #9 x 3 in. Star Flat-Head Wood Deck Screws (5 lb.-Pack)",
        price: 25.61,
        link: "https://www.homedepot.com/p/Grip-Rite-6-x-1-1-4-in-Philips-Bugle-Head-Coarse-Thread-Sharp-Point-Drywall-Screws-1-lb-Pack-114CDWS1/100152392"
    }

}
var materials = {
    "16 in hairpin legs": {
        title: "16 in. Black Steel 2-Rod Hairpin Leg (4-Pack)",
        price: 34.97,
        link: "https://www.homedepot.com/p/Crates-Pallet-16-in-Black-Steel-2-Rod-Hairpin-Leg-4-Pack-6420011004/305047738"
    },
    "countertop epoxy": {
        title: "The Tile Doctor 5 kg Starlike Crystal Glass Grout",
        price: 99.95,
        link: "https://www.homedepot.com/p/The-Tile-Doctor-5-kg-Starlike-Crystal-Glass-Grout-C-350-5kg/305045251"
    },
    "white paint": {
        title: "BEHR Premium Plus Ultra 5-gal. Medium Base Flat Low Voc Exterior Paint",
        price: 175.00,
        link: "https://www.homedepot.com/p/BEHR-Premium-Plus-Ultra-5-gal-Medium-Base-Flat-Low-Voc-Exterior-Paint-2485405/202301631"
    },
    "panel round board": {
        title: "1 in. x 36 in. x 3 ft. Pine Edge Glued Panel Round Board",
        price: 39.33,
        link: "https://www.homedepot.com/p/1-in-x-1-5-ft-x-1-5-ft-Pine-Edge-Glued-Panel-Round-Board-680435/202017011"
    },
    '120" x 9" x 1 1/2" red oak': {
        title: "1 in. x 39.5 in. x 11.5 in. Reclaimed Red Wine Soaked Wine Barrel Wood Wall Panel",
        price: 45.00,
        link: "https://www.homedepot.com/p/1-in-x-39-5-in-x-11-5-in-Reclaimed-Red-Wine-Soaked-Wine-Barrel-Wood-Wall-Panel-ABC-WNE-SOAK/301397727"
    },
    "Hairpin table legs": {
        title: "Standard 3/8 in. Dia 28 in. Raw Steel 2-Rod Hairpin Leg (Each Leg Sold Separately)",
        price: 17.99,
        link: "https://www.homedepot.com/p/Standard-3-8-in-Dia-28-in-Raw-Steel-2-Rod-Hairpin-Leg-Each-Leg-Sold-Separately-DIY-HL-38-28/301974087"
    },
    "22 mm wood plank": {
        title: "TrafficMASTER Hand scraped Saratoga Hickory 7 mm Thick x 7-2/3 in. Wide x 50-5/8 in. Length Laminate Flooring (24.17 sq. ft. / case)",
        price: 21.48,
        link: "https://www.homedepot.com/p/TrafficMASTER-Hand-scraped-Saratoga-Hickory-7-mm-Thick-x-7-2-3-in-Wide-x-50-5-8-in-Length-Laminate-Flooring-24-17-sq-ft-case-34089/204135461"
    },
    "10 mm tubillions": {
        title: "10 mm - 1.5 Zinc-Plated Metric Hex Nut (2 per Pack)",
        price: .96,
        link: "https://www.homedepot.com/p/10-mm-1-5-Zinc-Plated-Metric-Hex-Nut-2-per-Pack-803778/204274084"
    },
    "Mounting adhesive": {
        title: "Command Small, Medium and Large Assorted Refill Mounting Strip (16 per Pack)",
        price: 3.97,
        link: "https://www.homedepot.com/p/Command-Small-Medium-and-Large-Assorted-Refill-Mounting-Strip-16-per-Pack-17200CL-ES/205065860"
    },
    "adhesive": {
        title: "Titebond III 16 oz. Ultimate Wood Glue",
        price: 7.47,
        link: "https://www.homedepot.com/p/Liquid-Nails-10-oz-Extreme-Heavy-Duty-Adhesive-LN-907/205089262"
    },
    "10 X 10 mm wooden strip": {
        title: "1 in. x 3 in. x 8 ft. Furring Strip Board",
        price: 1.92,
        link: "https://www.homedepot.com/p/1-in-x-3-in-x-8-ft-Furring-Strip-Board-164704/100094214"
    },
    "5 mm DM board": {
        title: "7/16 in. x 48 in. x 8ft. Oriented Strand Board",
        price: 10.15,
        link: "https://www.homedepot.com/p/7-16-in-x-48-in-x-8ft-Oriented-Strand-Board-386081/202106230"
    },
    "Varnish": {
        title: "Citristrip 1/2 gal. Safer Paint and Varnish Stripping Gel",
        price: 19.97,
        link: "https://www.homedepot.com/p/Citristrip-1-2-gal-Safer-Paint-and-Varnish-Stripping-Gel-HCG73803T/100141801"
    },
    "Multipurpose primer": {
        title: "Zinsser PrimeCoat White Water-Based Interior Multi-Purpose Primer & Sealer",
        price: 59.92,
        link: "https://www.homedepot.com/p/Zinsser-PrimeCoat-5-gal-White-Water-Based-Interior-Multi-Purpose-Primer-Sealer-324259/302019741"
    },
    "Acrylic enamel": {
        title: "Rust-Oleum Automotive 12 oz. Acrylic Enamel Flat Black Spray Paint (6-Pack)",
        price: 34.74,
        link: "https://www.homedepot.com/p/Americana-Decor-8-oz-Warm-White-Satin-Enamel-Paint-ADSA03-98/300953692"
    },
    "Bed slats": {
        title: "Structures Adjustable Metal Bed Frame",
        price: 51.99,
        link: "https://www.homedepot.com/p/Instant-Foundation-Instant-Foundation-Full-Size-4-in-H-Low-Profile-Mattress-Foundation-123001-5030/300707097"
    },
    "Planks": {
        title: "WeatherShield 2 in. x 4 in. x 8 ft. #2 Prime Ground Contact Pressure-Treated Lumber",
        price: 4.77,
        link: "https://www.homedepot.com/p/WeatherShield-2-in-x-4-in-x-8-ft-2-Prime-Ground-Contact-Pressure-Treated-Lumber-253920/206967811"
    },
    "plywood": {
        title: "7/16 in. x 48 in. x 8ft. Oriented Strand Board",
        price: 10.15,
        link: "https://www.homedepot.com/p/7-16-in-x-48-in-x-8ft-Oriented-Strand-Board-386081/202106230"
    },
    "wooden strips": {
        title: "1 in. x 3 in. x 8 ft. Furring Strip Board",
        price: 1.92,
        link: "https://www.homedepot.com/p/1-in-x-3-in-x-8-ft-Furring-Strip-Board-164704/100094214"
    },
    "hinges": {
        title: "Everbilt 1 in. Zinc Plated Non-Removable Pin Narrow Utility Hinges (2-Pack)",
        price: 1.97,
        link: "https://www.homedepot.com/p/Everbilt-1-in-Zinc-Plated-Non-Removable-Pin-Narrow-Utility-Hinges-2-Pack-15161/202034166"
    },
    "brackets": {
        title: "Veranda Traditional Williamsburg Vinyl Rail Line Bracket Kit (4-Pack)",
        price: 12.97,
        link: "https://www.homedepot.com/p/Crown-Bolt-10-in-x-12-in-White-Shelf-Bracket-15254/202034279"
    },
    "wood glue": {
        title: "Gorilla 8 oz. Wood Glue",
        price: 3.97,
        link: "https://www.homedepot.com/p/Gorilla-8-oz-Wood-Glue-62000/100672167"
    },
    "screws": {
        title: "Deck Mate #9 x 3 in. Star Flat-Head Wood Deck Screws (5 lb.-Pack)",
        price: 25.61,
        link: "https://www.homedepot.com/p/Grip-Rite-6-x-1-1-4-in-Philips-Bugle-Head-Coarse-Thread-Sharp-Point-Drywall-Screws-1-lb-Pack-114CDWS1/100152392"
    }

}
fetch(`http://localhost:3000/search/catg/${selected.split(',')[0].toLowerCase()}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        $(".loader").hide();
        console.log("hello");
        for (let i = 0; i < myJson.length; i++) {
            var diy = myJson[i];
            if (typeof diy.error != 'string') {
                var im = diy.square2Url;
                var link = "https://www.instructables.com" + diy.showUrl;
                var price = 0;
                var description = "This is the description of the item"
                if (projectMaterials[link] != undefined) {
                    for (var tmp in projectMaterials[link]) {
                        var val = projectMaterials[link][tmp];
                        price += materials[val].price;
                    }
                }
                if (price == 0) {
                    price = Math.random() * budget;
                }
                if (price <= budget) {
                    results.push(diy);
                    var priceString = "$" + price.toFixed(2);
                    $("#response").append(`<li style='margin:5px;'>
                    <div class='box element' style='margin-left:20%; border-radius:30px;margin-right:20%;'>
                        <div>
                            <h2 class='is-size-5' style=' font-weight:bold;'>
                                ${myJson[i].title}
                            </h2>

                            <h2 class='is-size-5' style=' font-weight:bold;'>
                                ${priceString}
                            </h2>
                        </div>
                        <figure class='image'>
                            <img id='image' class='is-rounded' style='height:200px;width:200px;'src='${im}'>
                            </img>
                        </figure>
                        <h6 style='margin-bottom:10%;'>
                            ${link}
                        </h6>
                        <a class='button'>materials</a>
                    </div>
                </li>`);
                }
            }
        }
        $("#content").show();
        $(".button").click(function () {
            var data = results[$(".button").index(this)];
            // Get the modal
            var modal = document.getElementById('myModal');
            $("#materiallist").empty();
            var link = "https://www.instructables.com" + data.showUrl;
            if (projectMaterials[link] != undefined) {
                for (var tmp in projectMaterials[link]) {
                    var val = projectMaterials[link][tmp];
                    $("#materiallist").append(`<li><a href='${materials[val].link}'>${materials[val].title}</a><h2>$${materials[val].price}</h2></li>`);
                }
            }
            $(".modal-header>h2").text(data.title);
            modal.style.display = "block";
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        });
    });