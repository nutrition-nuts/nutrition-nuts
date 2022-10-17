// interface thesaurusEntry {
//     entry: keyof typeof String;
//     synonyms: Array<String>
// }

interface thesaurus {
  [key: string]: string[]
}
const allergyThesaurus: thesaurus = {
  Peanuts: [
    'peanut',
    'peanuts',
    'Arachis oil',
    'peanut oil',
    'Ground nuts',
    'Mandelonas',
    'Peanut butter'
  ],
  'Tree Nuts': [
    'Almond',
    'Beechnut',
    'Black walnut hull extract',
    'Brazil nut',
    'Butternut',
    'Cashew',
    'Chestnut',
    'Chinquapin nut',
    'Coconut',
    'Filbert',
    'Hazelnut',
    'Ginkgo nut',
    'Hickory nut',
    'Litchi',
    'lichee',
    'lychee',
    'Macadamia nut',
    'Marzipan',
    'almond paste',
    'Nangai nut',
    'Pecan',
    'Pesto',
    'Pili nut',
    'Pine nut',
    'Pistachio',
    'Praline',
    'Shea nut',
    'Walnut',
    'Walnut hull extract'
  ],
  Fish: [
    'Anchovies',
    'Bass',
    'Catfish',
    'Cod',
    'Flounder',
    'Grouper',
    'Haddock',
    'Hake',
    'Halibut',
    'Herring',
    'Mahi mahi',
    'Perch',
    'Pike',
    'Pollock',
    'Salmon',
    'Scrod',
    'Sole',
    'Snapper',
    'Swordfish',
    'Tilapia',
    'Trout',
    'Tuna',
    'Worcestershire sauce'
  ],
  Eggs: [
    'Albumin',
    'albumen',
    'Egg',
    'eggs',
    'egg white',
    'egg whites',
    'egg yolk',
    'egg yolks',
    'Eggnog',
    'Mayonnaise',
    'mayo',
    'Meringue',
    'meringue powder'
  ],
  Soy: [
    'Edamame',
    'Miso',
    'Natto',
    'Okara',
    'Shoyu',
    'soy milk',
    'soy nuts',
    'Soya',
    'Soy',
    'Soybean',
    'Soy sauce',
    'Tamari',
    'Tempeh',
    'Tofu'
  ]
}
export { thesaurus, allergyThesaurus }
