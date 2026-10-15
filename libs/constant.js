// constant untuk kata kata statis
const helpText = `
Selamat datang! Silahkan gunakan perintah berikut ini:

--------------------------

!help   => untuk menampilakan menu panduan 
!quote  => generate kata-kata
!advice => generate nasihat
!news   => generate berita terkini
!quake  => generate info gempa terkini
!cat    => generate fakta lucu tentang kucing
!follow [text] -> bot akan mengikuti text yang kamu ketik

--------------------------
`;

const invalidCommand = `Mohon maaf, command tidak tersedia! \nKetik !help untuk command list`;

module.exports = { helpText, invalidCommand };
