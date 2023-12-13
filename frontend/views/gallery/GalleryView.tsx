import Picture1 from '../../assets/gallery/foto1.jpg';
import Picture2 from '../../assets/gallery/foto2.jpg';
import Picture3 from '../../assets/gallery/foto3.png';
import Picture4 from '../../assets/gallery/foto4.jpg';
import Picture5 from '../../assets/gallery/foto5.jpg';
import Picture6 from '../../assets/gallery/foto6.jpg';

export default function GalleryView() {
  return (
    <main className="p-m">
      <h1>Seguem fotos da nossa moderna estrutura</h1>
      <div className="grid grid-cols-2 gap-s mt-m">
        {[Picture1, Picture2, Picture3, Picture4, Picture5, Picture6].map(
          (picture, index) => {
            return (
              <img
                key={index}
                src={picture}
                alt={`Foto ${index + 1}`}
                className="w-full h-full cover-full"
              />
            );
          }
        )}
      </div>
    </main>
  );
}
