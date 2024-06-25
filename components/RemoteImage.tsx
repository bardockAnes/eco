import { Image } from 'react-native';
import React, { ComponentProps, useEffect, useState } from 'react';
import { supabase } from '@/supabaseS/supabase';

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState<string>(fallback);

  useEffect(() => {
    if (!path) return;

    const loadImage = async () => {
      setImage(fallback);
      if (path.startsWith('file://')) {
        setImage(path);
      } else {
        const { data, error } = await supabase.storage
          .from('works.images')
          .download(path);

        if (error) {
          console.log(error);
          return;
        }

        if (data) {
          const fr = new FileReader();
          fr.readAsDataURL(data);
          fr.onload = () => {
            setImage(fr.result as string);
          };
        }
      }
    };

    loadImage();
  }, [path, fallback]);

  return <Image source={{ uri: image }} {...imageProps} />;
};

export default RemoteImage;
