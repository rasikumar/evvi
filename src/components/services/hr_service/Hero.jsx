import { HR_video } from "../../../assets"
import { HR_Content } from "../constant"

const Hero = () => {
  const { header, subheader } = HR_Content[0]
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 h-screen -z-10 bg-t-secondary/60">
       <video src={HR_video} autoPlay muted loop className="object-cover w-full h-full opacity-75"></video>
      </div>
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-semibold text-white">{header.slice(0,28)} </h1>
          <h1 className="text-5xl font-semibold text-white">{header.slice(28,56)}</h1>
        </div>
        <p className="text-white font-semibold">{subheader }</p>
      </div>
    </div>
  )
}

export default Hero
