import logo from '../assets/logo.png';
export default function LogoSideCard(){
    return(
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white p-10 rounded-xl">
  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-300 flex items-center justify-center mb-6">
  <img src={logo} alt="Logo" className="w-[200px] h-auto mx-auto"/>
  </div>

  <h2 className="text-3xl font-bold mb-2">Welcome to GharBas
  </h2>
  <p className="text-sm text-orange-100 text-center">
    Find the perfect homestay for you with ease and comfort
  </p>
</div>

    );
}   