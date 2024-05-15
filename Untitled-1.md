```tsx
npx expo install expo-file-system base64-arraybuffer
```

From the Create Product screen (`app/(admin)/menu/create.tsx`), let’s upload the image to supabase

```tsx
const uploadImage = async () => {
  if (!image?.startsWith('file://')) {
    return;
  }

  const base64 = await FileSystem.readAsStringAsync(image, {
    encoding: 'base64',
  });
  const filePath = `${randomUUID()}.png`;
  const contentType = 'image/png';
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, decode(base64), { contentType });

  if (data) {
    return data.path;
  }
};
```

```tsx
const uploadImage = async () => {
  if (!image?.startsWith('file://')) {
    return;
  }

  const base64 = await FileSystem.readAsStringAsync(image, {
    encoding: 'base64',
  });
  const filePath = `${randomUUID()}.png`;
  const contentType = 'image/png';
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, decode(base64), { contentType });

  if (data) {
    return data.path;
  }
};
```

Use the function inside the `onCreate` and `onUpdate` functions above

```tsx
const onCreate = async () => {
  if (!validateInput()) {
    return;
  }
  const imagePath = await uploadImage();
  const newProduct: Omit<Product, 'id'> = { name, price: parseFloat(price) };
  if (imagePath) {
    newProduct.image = imagePath;
  }
  insertProduct(newProduct, {
    onSuccess: () => {
      resetFields();
      router.back();
    },
  });
};
```

# Download images

To render the images from the supabase, we first have to download them. Let’s create a new component `RemoteImage.tsx` that will receive a file key, and will download and render the remote image

```tsx
import { Image } from 'react-native';
import React, { ComponentProps, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

type RemoteImageProps = {
  path?: string;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage('');
      const { data, error } = await supabase.storage
        .from('product-images')
        .download(path);

      if (error) {
        console.log(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);

  if (!image) {
  }

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;
```

Now, we can use it in the `ProductListItem` to render the product image from our storage

```tsx
<RemoteImage
  fallback={defaultPizzaImage}
  path={product.image}
  style={styles.image}
  resizeMode="contain"
/>
```