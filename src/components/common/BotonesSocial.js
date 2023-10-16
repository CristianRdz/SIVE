import React from 'react';
import { View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { linkFacebook } from '../../data/redes';
import { linkInstagram } from '../../data/redes';
import { linkWhatsapp } from '../../data/redes';
import { Linking } from 'react-native';

export default function BotonesSocial() {
  const handleOpenLink = (enlace) => {
    Linking.openURL(enlace);
  };
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 }}>
      <SocialIcon type="facebook" onPress={() => handleOpenLink(linkFacebook)} />
      <SocialIcon type="instagram" onPress={() => handleOpenLink(linkInstagram)} />
      <SocialIcon type="whatsapp" onPress={() => handleOpenLink(linkWhatsapp)} />
    </View>
  );
};

