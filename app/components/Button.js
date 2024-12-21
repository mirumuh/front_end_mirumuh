const Button = ({ variant, label, onClick }) => {
  const color =
    variant === 'brown'
      ? 'bg-foreground hover:bg-light-darker-brown text-white'
      : 'bg-blue hover:bg-light-darker-blue text-white'
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-xl w-min shadow whitespace-nowrap h-min font-semibold  ${color}`}
    >
      {label}
    </button>
  )
}

export default Button
