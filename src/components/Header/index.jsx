
const Header = ({ title }) => {
  return (
    <div className="flex items-center justify-center my-4">
        <h1 className="md:text-2xl text-xl font-semibold">{title}</h1>
    </div>
  )
}

export default Header