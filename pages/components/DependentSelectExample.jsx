import React, { useState } from 'react';
const regions = [
    { id: '1', label: 'Sélectionner' },
    { id: '2', label: 'Tunis' },
    { id: '3', label: 'Ariana' },
    { id: '4', label: 'La Manouba' },
    { id: '5', label: 'Nabeul' },
    { id: '6', label: 'Zaghouan' },
    { id: '7', label: 'Bizerte' },
    { id: '8', label: 'Béja' },
    { id: '9', label: 'Jendouba' },
    { id: '10', label: 'Le Kef' },
    { id: '11', label: 'Siliana' },
    { id: '12', label: 'Kairouan' },
    { id: '13', label: 'Kasserine' },
    { id: '14', label: 'Sidi Bouzid' },
    { id: '15', label: 'Sousse' },
    { id: '16', label: 'Monastir' },
    { id: '17', label: 'Mahdia' },
    { id: '18', label: 'Sfax' },
    { id: '19', label: 'Gafsa' },
    { id: '20', label: 'Tozeur' },
    { id: '21', label: 'Kebili' },
    { id: '22', label: 'Gabes' },
    { id: '23', label: 'Médenine' },
    { id: '24', label: 'Tataouine' }    
  ];
  
  const cities = {
    '1': [
      { id: '', label: 'Ville1' },
    
      // ... cities for Tunis
    ],  '2': [
        { id: '1', label: 'Bab Bhar' },
        { id: '2', label: 'Bab Bnet' },
        { id: '3', label: 'Bab Fella' },
        { id: '4', label: 'Bab Khadhra' },
        { id: '5', label: 'Bab Mnara' },
        { id: '6', label: 'Bab Saadoun' },
        { id: '7', label: 'Bab Souika' },
        { id: '8', label: 'Belvedère' },
        { id: '9', label: 'Carthage' },
        { id: '10', label: 'Cite El Khadra' },
        { id: '11', label: 'Cité El Mahrajen' },
        { id: '12', label: 'Cité Hlel' },
        { id: '13', label: 'Cité Ibn Khaldoun' },
        { id: '14', label: 'Cité Ibn Sina' },
        { id: '15', label: 'Cité Intilaka' },
        { id: '16', label: 'Cité Rommana' },
        { id: '17', label: 'El Agba' },
        { id: '18', label: 'El Aouina' },
        { id: '19', label: 'El Hrairia' },
        { id: '20', label: 'El Kabbaria' },
        { id: '21', label: 'El Kram' },
        { id: '22', label: 'El Menzah' },
        { id: '23', label: 'El Omrane' },
        { id: '24', label: 'El Omrane Superieur' },
        { id: '25', label: 'El Ouerdia' },
        { id: '26', label: 'Essijoumi' },
        { id: '27', label: 'Ettahrir' },
        { id: '28', label: 'Ezzouhour' },
        { id: '29', label: 'Gammart' },
        { id: '30', label: 'Hafsia' },
        { id: '31', label: 'Jardins de Carthage' },
        { id: '32', label: 'Jebel Jelloud' },
        { id: '33', label: 'La Goulette' },
        { id: '34', label: 'La Marsa' },
        { id: '35', label: 'La Medina' },
        { id: '36', label: 'Le Bardo' },
        { id: '37', label: 'Les berges du lac 1' },
        { id: '38', label: 'Les berges du lac 2' },
        { id: '39', label: 'Manar 1' },
        { id: '40', label: 'Manar 2' },
        { id: '41', label: 'Manar 3' },
        { id: '42', label: 'Menzah 4' },
        { id: '43', label: 'Menzah 9' },
        { id: '44', label: 'Montplaisir' },
        { id: '45', label: 'Mourouj 2' },
        { id: '46', label: 'Sidi Bou Saïd' },
        { id: '47', label: 'Sidi El Bechir' },
        { id: '48', label: 'Sidi Hassine' }
      ]
      ,  
      '3': [
        { id: '22', label: 'Ariana Ville' },
        { id: '285', label: 'Borj El Baccouch' },
        { id: '286', label: 'Borj Louzir' },
        { id: '287', label: 'Borj Touil' },
        { id: '288', label: 'Cebelet Ben Ammar' },
        { id: '289', label: 'Charguia II' },
        { id: '290', label: 'Cité El Ghazela' },
        { id: '264', label: 'Ennasr  1' },
        { id: '303', label: 'Ennasr  2' },
        { id: '23', label: 'Ettadhamen' },
        { id: '24', label: 'Kalaat Landlous' },
        { id: '25', label: 'La Soukra' },
        { id: '292', label: 'Menzah  1' },
        { id: '296', label: 'Menzah  5' },
        { id: '293', label: 'Menzah  6' },
        { id: '299', label: 'Menzah  7' },
        { id: '294', label: 'Menzah  8' },
        { id: '26', label: 'Mnihla' },
        { id: '27', label: 'Raoued' },
        { id: '295', label: 'Riadh El Andalous' },
        { id: '28', label: 'Sidi Thabet' },
      ],
      '4': [
        { id: '41', label: 'Borj El Amri' },
        { id: '311', label: 'Borj Etoumi' },
        { id: '312', label: 'Chabbaou' },
        { id: '313', label: 'Chaouat' },
        { id: '314', label: 'Complexe Universitaire' },
        { id: '315', label: 'Denden' },
        { id: '42', label: 'Douar Hicher' },
        { id: '316', label: 'Eddkhila' },
        { id: '43', label: 'El Battan' },
        { id: '317', label: 'El Fejja' },
        { id: '44', label: 'Jedaida' },
        { id: '45', label: 'Mannouba' },
        { id: '46', label: 'Mornaguia' },
        { id: '47', label: 'Oued Ellil' },
        { id: '48', label: 'Tebourba' },
      ],
      '5': [
        { id: '49', label: 'Beni Khalled' },
        { id: '50', label: 'Beni Khiar' },
        { id: '51', label: 'Bou Argoub' },
        { id: '52', label: 'Dar Chaabane Elfehri' },
        { id: '53', label: 'El Haouaria' },
        { id: '54', label: 'El Mida' },
        { id: '55', label: 'Grombalia' },
        { id: '56', label: 'Hammam El Ghezaz' },
        { id: '57', label: 'Hammamet' },
        { id: '58', label: 'Kelibia' },
        { id: '59', label: 'Korba' },
        { id: '60', label: 'Menzel Bouzelfa' },
        { id: '61', label: 'Menzel Temime' },
        { id: '62', label: 'Nabeul' },
        { id: '63', label: 'Soliman' },
        { id: '64', label: 'Takelsa' }
      ],
      '6': [
        { id: '65', label: 'Bir Mcherga' },
        { id: '66', label: 'El Fahs' },
        { id: '67', label: 'Ennadhour' },
        { id: '68', label: 'Hammam Zriba' },
        { id: '69', label: 'Saouef' },
        { id: '70', label: 'Zaghouan' },
      ],
      '7': [
        { id: '71', label: 'Bizerte Nord' },
        { id: '72', label: 'Bizerte Sud' },
        { id: '73', label: 'El Alia' },
        { id: '74', label: 'Ghar El Melh' },
        { id: '75', label: 'Ghezala' },
        { id: '77', label: 'Joumine' },
        { id: '78', label: 'Mateur' },
        { id: '79', label: 'Menzel Bourguiba' },
        { id: '80', label: 'Menzel Jemil' },
        { id: '81', label: 'Ras Jebel' },
        { id: '82', label: 'Sejnane' },
        { id: '83', label: 'Tinja' },
        { id: '84', label: 'Utique' },
        { id: '76', label: 'Zarzouna' },
      ],
      '8': [
        { id: '85', label: 'Amdoun' },
        { id: '86', label: 'Beja Nord' },
        { id: '87', label: 'Beja Sud' },
        { id: '88', label: 'Goubellat' },
        { id: '89', label: 'Mejez El Bab' },
        { id: '90', label: 'Nefza' },
        { id: '91', label: 'Teboursouk' },
        { id: '92', label: 'Testour' },
        { id: '93', label: 'Thibar' },
      ],
      '9': [
        { id: '94', label: 'Ain Draham' },
        { id: '95', label: 'Balta Bou Aouene' },
        { id: '96', label: 'Bou Salem' },
        { id: '97', label: 'Fernana' },
        { id: '98', label: 'Ghardimaou' },
        { id: '99', label: 'Jendouba' },
        { id: '100', label: 'Jendouba Nord' },
        { id: '101', label: 'Oued Mliz' },
        { id: '102', label: 'Tabarka' },
      ],
      '10': [
        { id: '103', label: 'Dahmani' },
        { id: '104', label: 'El Ksour' },
        { id: '105', label: 'Jerissa' },
        { id: '106', label: 'Kalaa El Khasba' },
        { id: '107', label: 'Kalaat Sinane' },
        { id: '108', label: 'Le Kef Est' },
        { id: '109', label: 'Le Kef Ouest' },
        { id: '110', label: 'Le Sers' },
        { id: '111', label: 'Nebeur' },
        { id: '112', label: 'Sakiet Sidi Youssef' },
        { id: '113', label: 'Tajerouine' },
        { id: '114', label: 'Touiref' },
      ],
      '11': [
        { id: '103', label: 'Dahmani' },
        { id: '104', label: 'El Ksour' },
        { id: '105', label: 'Jerissa' },
        { id: '106', label: 'Kalaa El Khasba' },
        { id: '107', label: 'Kalaat Sinane' },
        { id: '108', label: 'Le Kef Est' },
        { id: '109', label: 'Le Kef Ouest' },
        { id: '110', label: 'Le Sers' },
        { id: '111', label: 'Nebeur' },
        { id: '112', label: 'Sakiet Sidi Youssef' },
        { id: '113', label: 'Tajerouine' },
        { id: '114', label: 'Touiref' },
      ],
      '12': [
        { id: '126', label: 'Bou Hajla' },
        { id: '127', label: 'Chebika' },
        { id: '128', label: 'Cherarda' },
        { id: '129', label: 'El Ala' },
        { id: '130', label: 'Haffouz' },
        { id: '131', label: 'Hajeb El Ayoun' },
        { id: '132', label: 'Kairouan Nord' },
        { id: '133', label: 'Kairouan Sud' },
        { id: '134', label: 'Nasrallah' },
        { id: '135', label: 'Oueslatia' },
        { id: '136', label: 'Sbikha' },
      ],
      '13': [
        { id: '329', label: 'Al Zouhour' },
        { id: '137', label: 'El Ayoun' },
        { id: '139', label: 'Feriana' },
        { id: '140', label: 'Foussana' },
        { id: '141', label: 'Haidra' },
        { id: '143', label: 'Jediliane' },
        { id: '144', label: 'Kasserine Nord' },
        { id: '145', label: 'Kasserine Sud' },
        { id: '146', label: 'Mejel Bel Abbes' },
        { id: '147', label: 'Sbeitla' },
        { id: '148', label: 'Sbiba' },
        { id: '149', label: 'Thala' },
      ],
      '14': [
        { id: '150', label: 'Ben Oun' },
        { id: '151', label: 'Bir El Haffey' },
        { id: '152', label: 'Cebbala' },
        { id: '153', label: 'Jilma' },
        { id: '154', label: 'Maknassy' },
        { id: '155', label: 'Menzel Bouzaiene' },
        { id: '156', label: 'Mezzouna' },
        { id: '157', label: 'Ouled Haffouz' },
        { id: '158', label: 'Regueb' },
        { id: '159', label: 'Sidi Bouzid Est' },
        { id: '160', label: 'Sidi Bouzid Ouest' },
        { id: '161', label: 'Souk Jedid' },
      ],
      '15': [
        { id: '162', label: 'Akouda' },
        { id: '163', label: 'Bou Ficha' },
        { id: '164', label: 'Enfidha' },
        { id: '165', label: 'Hammam Sousse' },
        { id: '166', label: 'Hergla' },
        { id: '167', label: 'Kalaa El Kebira' },
        { id: '168', label: 'Kalaa Essghira' },
        { id: '169', label: 'Kondar' },
        { id: '170', label: 'Msaken' },
        { id: '171', label: 'Sidi Bou Ali' },
        { id: '172', label: 'Sidi El Heni' },
        { id: '173', label: 'Sousse Jaouhara' },
        { id: '174', label: 'Sousse Riadh' },
        { id: '175', label: 'Sousse Ville' },
      ],
      '16': [
        { id: '176', label: 'Bekalta' },
        { id: '177', label: 'Bembla' },
        { id: '178', label: 'Beni Hassen' },
        { id: '179', label: 'Jemmal' },
        { id: '180', label: 'Ksar Helal' },
        { id: '181', label: 'Ksibet El Mediouni' },
        { id: '182', label: 'Moknine' },
        { id: '183', label: 'Monastir' },
        { id: '184', label: 'Ouerdanine' },
        { id: '185', label: 'Sahline' },
        { id: '186', label: 'Sayada Lamta Bou Hajar' },
        { id: '187', label: 'Teboulba' },
        { id: '188', label: 'Zeramdine' },
      ],
      '17': [
        { id: '189', label: 'Bou Merdes' },
        { id: '190', label: 'Chorbane' },
        { id: '191', label: 'El Jem' },
        { id: '192', label: 'Hbira' },
        { id: '193', label: 'Ksour Essaf' },
        { id: '194', label: 'La Chebba' },
        { id: '195', label: 'Mahdia' },
        { id: '196', label: 'Melloulech' },
        { id: '197', label: 'Ouled Chamakh' },
        { id: '198', label: 'Sidi Alouene' },
        { id: '199', label: 'Souassi' },
      ],
      '18': [
        { id: '200', label: 'Agareb' },
        { id: '201', label: 'Bir Ali Ben Khelifa' },
        { id: '202', label: 'El Amra' },
        { id: '203', label: 'El Hencha' },
        { id: '204', label: 'Esskhira' },
        { id: '205', label: 'Ghraiba' },
        { id: '206', label: 'Jebeniana' },
        { id: '208', label: 'Mahras' },
        { id: '209', label: 'Menzel Chaker' },
        { id: '210', label: 'Sakiet Eddaier' },
        { id: '211', label: 'Sakiet Ezzit' },
        { id: '212', label: 'Sfax Est' },
        { id: '213', label: 'Sfax Sud' },
        { id: '214', label: 'Sfax Ville' },
      ],
      '19': [
        { id: '215', label: 'Belkhir' },
        { id: '216', label: 'El Guettar' },
        { id: '217', label: 'El Ksar' },
        { id: '218', label: 'El Mdhilla' },
        { id: '219', label: 'Gafsa Nord' },
        { id: '220', label: 'Gafsa Sud' },
        { id: '221', label: 'Metlaoui' },
        { id: '222', label: 'Moulares' },
        { id: '223', label: 'Redeyef' },
        { id: '224', label: 'Sidi Aich' },
        { id: '225', label: 'Sned' },
      ],
      '20': [
        { id: '226', label: 'Degueche' },
        { id: '227', label: 'Hezoua' },
        { id: '228', label: 'Nefta' },
        { id: '229', label: 'Tameghza' },
        { id: '230', label: 'Tozeur' },
      ],
      '21': [
        { id: '231', label: 'Douz' },
        { id: '232', label: 'El Faouar' },
        { id: '233', label: 'Kebili Nord' },
        { id: '234', label: 'Kebili Sud' },
        { id: '235', label: 'Souk El Ahad' },
      ],
      '22': [
        { id: '236', label: 'El Hamma' },
        { id: '237', label: 'El Metouia' },
        { id: '238', label: 'Gabes Medina' },
        { id: '239', label: 'Gabes Ouest' },
        { id: '240', label: 'Gabes Sud' },
        { id: '241', label: 'Ghannouche' },
        { id: '242', label: 'Mareth' },
        { id: '243', label: 'Matmata' },
        { id: '244', label: 'Menzel Habib' },
        { id: '245', label: 'Nouvelle Matmata' },
      ],
      '23': [
        { id: '246', label: 'Ajim' },
        { id: '247', label: 'Ben Guerdane' },
        { id: '248', label: 'Beni Khedache' },
        { id: '249', label: 'Houmet Essouk' },
        { id: '250', label: 'Medenine Nord' },
        { id: '251', label: 'Medenine Sud' },
        { id: '252', label: 'Midoun' },
        { id: '253', label: 'Sidi Makhlouf' },
        { id: '254', label: 'Zarzis' },
      ],
      '24': [
        { id: '255', label: 'Bir Lahmar' },
        { id: '256', label: 'Dehiba' },
        { id: '257', label: 'Ghomrassen' },
        { id: '258', label: 'Remada' },
        { id: '259', label: 'Smar' },
        { id: '260', label: 'Tataouine Nord' },
        { id: '261', label: 'Tataouine Sud' },
      ],
    // ... other regions with their cities
  };
const DependentSelectExample = ({selectedRegion,setSelectedRegion,selectedCity,setSelectedCity,handleCityChange}) => {
  


  const handleRegionChange = (event) => {

    console.log("change of region" +event.target.value);
    
    setSelectedRegion(event.target.value);
    setSelectedCity(''); // Reset city selection when region changes
  };

 

  return (
    <div className="container mx-auto p-8">
      <div className="mb-4">
       <label htmlFor="regionId" className="block text-sm font-medium text-gray-700">Région *</label>
        <select
          id="regionId"
          name="regionId"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.label}
            </option>
          ))}
        </select>
        {selectedRegion === '1' && <p className="text-red-500 text-xs italic">Please select a valid region.</p>}
      </div>
      <div>
        <label htmlFor="cityId" className="block text-sm font-medium text-gray-700">Ville</label>
        <select
          id="cityId"
          name="cityId"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedRegion} // Disable city select until a region is selected
        >
          {selectedRegion && cities[selectedRegion].map((city) => (
            <option key={city.id} value={city.id}>
              {city.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DependentSelectExample;
