(function ($) {

  /**
   * Please, read this documentation, before you start to update/add resellers!
   * 1. For resellers we have 7 fields:
   *    - country (required, field must be found and taken in countries list, see countries list. Must be only one country for reseller!)
   *    - states (not required, field must be found and taken in states list, see states list. May be many states for reseller!)
   *    - title (required, title for reseller)
   *    - phone (required, reseller's phone)
   *    - href (required, link to reseller site)
   *    - www (required, text for link)
   *    - logo (required, reseller's logo name)
   *
   * 2. Field states are not required! If reseller does't have state, this field must be removed! see ex. 5.1
   *
   * 3. Logo file must be in the folder ./theme/images/logos/
   *
   * 4. Field states, must look like this
   *    - 'WA' (one state), see ex. 5.2
   *    - 'WA; OR; CA' (many states, necessary with space between states "; "), see ex. 5.3
   *
   * 5. Resellers examples
   *    5.1 Without states
   *    {
   *      country: 'BRAZIL',
   *      title: 'IST Sistemas',
   *      href: 'http://istsistemas.com.br/',
   *      www: 'istsistemas.com.br',
   *      logo: 'ISTSistemas.jpg'
   *    },
   *
   *    5.2 With one state
   *    {
   *      country: 'UNITED STATES',
   *      states: 'WA',
   *      title: 'GoEngineer',
   *      phone: '800-688-3234',
   *      href: 'http://www.goengineer.com/',
   *      www: 'www.goengineer.com',
   *      logo: 'GoEngineer.png'
   *    },
   *
   *    5.3 With many states
   *    {
   *      country: 'UNITED STATES',
   *      states: 'WA; OR; CA; ID; UT; NV; TX; OK; LA; AR',
   *      title: 'GoEngineer',
   *      phone: '800-688-3234',
   *      href: 'http://www.goengineer.com/',
   *      www: 'www.goengineer.com',
   *      logo: 'GoEngineer.png'
   *    },
   *
   * 6. Countries list
   *    - AFGHANISTAN
   *    - ALAND ISLANDS
   *    - ALBANIA
   *    - ALGERIA
   *    - AMERICAN SAMOA
   *    - ANDORRA
   *    - ANGOLA
   *    - ANGUILLA
   *    - ANTARCTICA
   *    - ANTIGUA AND BARBUDA
   *    - ARGENTINA
   *    - ARMENIA
   *    - ARUBA
   *    - AUSTRALIA
   *    - AUSTRIA
   *    - AZERBAIJAN
   *    - BAHAMAS
   *    - BAHRAIN
   *    - BANGLADESH
   *    - BARBADOS
   *    - BELARUS
   *    - BELGIUM
   *    - BELIZE
   *    - BENIN
   *    - BERMUDA
   *    - BHUTAN
   *    - BOLIVIA
   *    - BONAIRE, SINT EUSTATIUS AND SABA
   *    - BOSNIA AND HERZEGOVINA
   *    - BOTSWANA
   *    - BOUVET ISLAND
   *    - BRAZIL
   *    - BRITISH INDIAN OCEAN TERRITORY
   *    - BRUNEI DARUSSALAM
   *    - BULGARIA
   *    - BURKINA FASO
   *    - BURUNDI
   *    - CAMBODIA
   *    - CAMEROON
   *    - CANADA
   *    - CAPE VERDE
   *    - CAYMAN ISLANDS
   *    - CENTRAL AFRICAN REPUBLIC
   *    - CHAD
   *    - CHILE
   *    - CHINA
   *    - CHRISTMAS ISLAND
   *    - COCOS (KEELING) ISLANDS
   *    - COLOMBIA
   *    - COMOROS
   *    - CONGO
   *    - CONGO, DEMOCRATIC REPUBLIC
   *    - COOK ISLANDS
   *    - COSTA RICA
   *    - CôTE D'IVOIRE
   *    - CROATIA
   *    - CUBA
   *    - CURACAO
   *    - CYPRUS
   *    - CZECH REPUBLIC
   *    - DENMARK
   *    - DJIBOUTI
   *    - DOMINICA
   *    - DOMINICAN REPUBLIC
   *    - ECUADOR
   *    - EGYPT
   *    - EL SALVADOR
   *    - EQUATORIAL GUINEA
   *    - ERITREA
   *    - ESTONIA
   *    - ETHIOPIA
   *    - FALKLAND ISLANDS (MALVINAS)
   *    - FAROE ISLANDS
   *    - FIJI
   *    - FINLAND
   *    - FRANCE
   *    - FRENCH GUIANA
   *    - FRENCH POLYNESIA
   *    - FRENCH SOUTHERN TERRITORIES
   *    - GABON
   *    - GAMBIA
   *    - GEORGIA
   *    - GERMANY
   *    - GHANA
   *    - GIBRALTAR
   *    - GREECE
   *    - GREENLAND
   *    - GRENADA
   *    - GUADELOUPE
   *    - GUAM
   *    - GUATEMALA
   *    - GUERNSEY
   *    - GUINEA
   *    - GUINEA-BISSAU
   *    - GUYANA
   *    - HAITI
   *    - HEARD IS. & MCDONALD ISLANDS
   *    - HONDURAS
   *    - HONG KONG
   *    - HUNGARY
   *    - ICELAND
   *    - INDIA
   *    - INDONESIA
   *    - IRAN, ISLAMIC REPUBLIC OF
   *    - IRAQ
   *    - IRELAND
   *    - ISLE OF MAN
   *    - ISRAEL
   *    - ITALY
   *    - JAMAICA
   *    - JAPAN
   *    - JERSEY
   *    - JORDAN
   *    - KAZAKHSTAN
   *    - KENYA
   *    - KIRIBATI
   *    - KOREA, DEMO. PEOPLE'S REP.
   *    - KOREA, REPUBLIC OF
   *    - KUWAIT
   *    - KYRGYZSTAN
   *    - LAO
   *    - LATVIA
   *    - LEBANON
   *    - LESOTHO
   *    - LIBERIA
   *    - LIBYAN ARAB JAMAHIRIYA
   *    - LIECHTENSTEIN
   *    - LITHUANIA
   *    - LUXEMBOURG
   *    - MACAO
   *    - MACEDONIA
   *    - MADAGASCAR
   *    - MALAWI
   *    - MALAYSIA
   *    - MALDIVES
   *    - MALI
   *    - MALTA
   *    - MARSHALL ISLANDS
   *    - MARTINIQUE
   *    - MAURITANIA
   *    - MAURITIUS
   *    - MAYOTTE
   *    - MEXICO
   *    - MICRONESIA
   *    - MOLDOVA, REPUBLIC OF
   *    - MONACO
   *    - MONGOLIA
   *    - MONTENEGRO
   *    - MONTSERRAT
   *    - MOROCCO
   *    - MOZAMBIQUE
   *    - MYANMAR
   *    - NAMIBIA
   *    - NAURU
   *    - NEPAL
   *    - NETHERLANDS
   *    - NETHERLANDS ANTILLES
   *    - NEW CALEDONIA
   *    - NEW ZEALAND
   *    - NICARAGUA
   *    - NIGER
   *    - NIGERIA
   *    - NIUE
   *    - NORFOLK ISLAND
   *    - NORTHERN IRELAND
   *    - NORTHERN MARIANA ISLANDS
   *    - NORWAY
   *    - OMAN
   *    - PAKISTAN
   *    - PALAU
   *    - PALESTINIAN TERRITORY, OCCUPIED
   *    - PANAMA
   *    - PAPUA NEW GUINEA
   *    - PARAGUAY
   *    - PERU
   *    - PHILIPPINES
   *    - PITCAIRN
   *    - POLAND
   *    - PORTUGAL
   *    - PUERTO RICO
   *    - QATAR
   *    - REUNION
   *    - ROMANIA
   *    - RUSSIAN FEDERATION
   *    - RWANDA
   *    - S. GEORGIA & S. SANDWICH IS.
   *    - SAINT BARTHELEMY
   *    - SAINT HELENA
   *    - SAINT KITTS AND NEVIS
   *    - SAINT LUCIA
   *    - SAINT MARTIN
   *    - SAINT PIERRE AND MIQUELON
   *    - SAINT VINCENT AND THE GRENADINES
   *    - SAMOA
   *    - SAN MARINO
   *    - SAO TOME AND PRINCIPE
   *    - SAUDI ARABIA
   *    - SENEGAL
   *    - SERBIA
   *    - SERBIA AND MONTENEGRO
   *    - SEYCHELLES
   *    - SIERRA LEONE
   *    - SINGAPORE
   *    - SINT MAARTEN
   *    - SLOVAKIA
   *    - SLOVENIA
   *    - SOLOMON ISLANDS
   *    - SOMALIA
   *    - SOUTH AFRICA
   *    - SPAIN
   *    - SRI LANKA
   *    - SUDAN
   *    - SURINAME
   *    - SVALBARD AND JAN MAYEN ISLANDS
   *    - SWAZILAND
   *    - SWEDEN
   *    - SWITZERLAND
   *    - SYRIAN ARAB REPUBLIC
   *    - TAIWAN
   *    - TAJIKISTAN
   *    - TANZANIA, UNITED REPUBLIC OF
   *    - THAILAND
   *    - TIMOR-LESTE
   *    - TOGO
   *    - TOKELAU
   *    - TONGA
   *    - TRINIDAD AND TOBAGO
   *    - TUNISIA
   *    - TURKEY
   *    - TURKMENISTAN
   *    - TURKS AND CAICOS ISLANDS
   *    - TUVALU
   *    - UGANDA
   *    - UKRAINE
   *    - UNITED ARAB EMIRATES
   *    - UNITED KINGDOM
   *    - UNITED STATES
   *    - URUGUAY
   *    - US MINOR OUTLYING ISLANDS
   *    - UZBEKISTAN
   *    - VANUATU
   *    - VATICAN CITY STATE
   *    - VENEZUELA
   *    - VIET NAM
   *    - VIRGIN ISLANDS, BRITISH
   *    - VIRGIN ISLANDS, U.S.
   *    - WALLIS AND FUTUNA
   *    - WESTERN SAHARA
   *    - YEMEN
   *    - ZAMBIA
   *    - ZIMBABWE
   *
   * 7. States list
   *    - AL
   *    - AK
   *    - AZ
   *    - AR
   *    - CA
   *    - CO
   *    - CT
   *    - DE
   *    - FL
   *    - GA
   *    - HI
   *    - ID
   *    - IL
   *    - IN
   *    - IA
   *    - KS
   *    - KY
   *    - LA
   *    - ME
   *    - MD
   *    - MA
   *    - MI
   *    - MN
   *    - MS
   *    - MO
   *    - MT
   *    - NE
   *    - NV
   *    - NH
   *    - NJ
   *    - NM
   *    - NY
   *    - NC
   *    - ND
   *    - OH
   *    - OK
   *    - OR
   *    - PA
   *    - RI
   *    - SC
   *    - SD
   *    - TN
   *    - TX
   *    - UT
   *    - VT
   *    - VA
   *    - WA
   *    - WV
   *    - WI
   *    - WY
   *
   * 8. Now you are ready to update/add resellers! If you have any questions, here is my email ivan.tsarkov@altium.com , good luck!
   */

  var resellers = [
    {
      country: 'UNITED STATES',
      states: 'CA; AZ',
      title: 'Digital Dimensions',
      phone: '877-761-8838',
      href: 'http://www.ddicad.com/',
      www: 'www.ddicad.com',
      logo: 'Digital-Dimensions.gif'
    },
    {
      country: 'MEXICO',
      title: 'Digital Dimensions',
      phone: '877-761-8838',
      href: 'http://www.ddicad.com/',
      www: 'www.ddicad.com',
      logo: 'Digital-Dimensions.gif'
    },
    {
      country: 'UNITED STATES',
      states: 'WA; OR; CA; ID; UT; NV; TX; OK; LA; AR',
      title: 'GoEngineer',
      phone: '800-688-3234',
      href: 'http://www.goengineer.com/',
      www: 'www.goengineer.com',
      logo: 'GoEngineer.png'
    },
    {
      country: 'UNITED STATES',
      states: 'ME; NH; VT; MA; CT; RI; NY; PA; OH; MI; IN; IL; WI; MO; KS; WV; KY',
      title: 'Fisher Unitech',
      phone: '800-816-8314',
      href: 'http://www.funtech.com/',
      www: 'www.funtech.com',
      logo: 'funtech.png'
    },
    {
      country: 'UNITED STATES',
      states: 'CT; MA; ME; NH; RI; VT',
      title: 'CAP Inc.',
      phone: '800-424-2255',
      href: 'http://www.capinc.com/',
      www: 'www.capinc.com',
      logo: 'CapInc.png'
    },
    {
      country: 'UNITED STATES',
      states: 'OH; KY; IN; MI',
      title: '3DVision Technologies',
      phone: '800-745-3136',
      href: 'http://www.3dvision.com/',
      www: 'www.3dvision.com',
      logo: '3dvision-technologies.png'
    },
    {
      country: 'BRAZIL',
      title: 'IST Sistemas',
      phone: '19-3408-8989',
      href: 'http://istsistemas.com.br/',
      www: 'istsistemas.com.br',
      logo: 'ISTSistemas.jpg'
    },
    {
      country: 'BRAZIL',
      title: 'SKA',
      phone: '0800-510-2900',
      href: 'http://www.ska.com.br/',
      www: 'www.ska.com.br',
      logo: 'SKA.png'
    },
    {
      country: 'CANADA',
      title: 'CAD Micro',
      phone: '888-401-5885',
      href: 'http://www.cadmicro.com/',
      www: 'www.cadmicro.com',
      logo: 'cadmicrosolutions.png'
    },
    {
      country: 'CANADA',
      title: 'Javelin Technologies',
      phone: '1-877-219-6757',
      href: 'http://www.javelin-tech.com/',
      www: 'www.javelin-tech.com',
      logo: 'javelin.png'
    },
    {
      country: 'UNITED STATES',
      states: 'WI; IL; MI',
      title: 'Graphics Systems Corporation',
      phone: '800-454-2233',
      href: 'http://www.gxsc.com/',
      www: 'www.gxsc.com',
      logo: 'GraphicsSystems.png'
    },
    {
      country: 'UNITED STATES',
      states: 'MN; ND; SD; IA; NE; WI; CO; WY',
      title: 'Alignex',
      phone: '866-378-6829',
      href: 'http://www.alignex.com/',
      www: 'www.alignex.com',
      logo: 'alignex.jpg'
    },
    {
      country: 'UNITED STATES',
      states: 'AL; AR; FL; LA; MS; OK; TN; TX; DC; GA; MD; NC; SC; VA; WV',
      title: 'ModernTech',
      phone: ' 877-553-9001',
      href: 'http://www.moderntech.com/',
      www: 'www.moderntech.com',
      logo: 'moderntech.gif'
    },
    {
      country: 'UNITED STATES',
      states: 'DE; NJ; OH; PA; DC; GA; MD; NC; SC; VA; WV',
      title: 'TriMech',
      phone: '888-874-6324',
      href: 'http://trimech.com/',
      www: 'www.trimech.com',
      logo: 'TriMech.png'
    },
	{
     country: 'GERMANY',
     title: 'SolidLine AG',
     phone: '0800 - 76 54 396',
     href: 'https://www.solidline.de/',
     www: 'www.solidline.de',
     logo: 'SolidLine.png'
   },
	{
     country: 'AUSTRIA',
     title: 'SolidLine AG',
     phone: '0800 - 76 54 396',
     href: 'https://www.solidline.de/',
     www: 'www.solidline.de',
     logo: 'SolidLine.png'
   },
	{
     country: 'SWITZERLAND',
     title: 'SolidLine AG',
     phone: '0800 - 76 54 396',
     href: 'https://www.solidline.de/',
     www: 'www.solidline.de',
     logo: 'SolidLine.png'
   },

  {
      country: 'UNITED KINGDOM',
      title: 'NT CADCAM',
      phone: '0800 018 6957',
      href: 'http://www.ntcadcam.co.uk/',
      www: 'www.ntcadcam.co.uk',
      logo: 'NTCADCAM.png'
    },

  {
      country: 'IRELAND',
      title: 'NT CADCAM',
      phone: '0800 018 6957',
      href: 'http://www.ntcadcam.co.uk/',
      www: 'www.ntcadcam.co.uk',
      logo: 'NTCADCAM.png'
    },
    {
      country: 'UNITED KINGDOM',
      title: 'Solid Solutions Management',
      phone: '01926 333777',
      href: 'http://www.solidsolutions.co.uk/',
      www: 'www.solidsolutions.co.uk',
      logo: 'Solid-Solutions-Supporting_Excellence.gif'
    },
    {
      country: 'IRELAND',
      title: 'Solid Solutions Management',
      phone: '01926 333777',
      href: 'http://www.solidsolutions.co.uk/',
      www: 'www.solidsolutions.co.uk',
      logo: 'Solid-Solutions-Supporting_Excellence.gif'
    },
    {
      country: 'CROATIA',
      title: 'Solid World SRL',
      phone: '0422-1990911',
      href: 'http://www.solidworld.it/',
      www: 'www.solidworld.it',
      logo: 'solidworld.png'
    },
    {
      country: 'ITALY',
      title: 'Solid World SRL',
      phone: '0422 1990911',
      href: 'http://www.solidworld.it/',
      www: 'www.solidworld.it',
      logo: 'solidworld.png'
    },
    {
      country: 'SLOVENIA',
      title: 'Solid World SRL',
      phone: '0422 1990911',
      href: 'http://www.solidworld.it/',
      www: 'www.solidworld.it',
      logo: 'solidworld.png'
    },
    {
      country: 'FRANCE',
      title: 'CAD Vision',
      phone: '33 (0)1 39 30 6506',
      href: 'http://www.cadvision.fr/',
      www: 'www.cadvision.fr',
      logo: 'cadvision.png'
    }
  ];

  $(function () {
    $.resellers(resellers);
  });

})(jQuery);