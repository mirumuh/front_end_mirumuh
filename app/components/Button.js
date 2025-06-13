const Button = ({ variant, label, onClick, type, size }) => {
  const sizeClass =
    size === 'small'
      ? 'text-sm'
      : size === 'large'
      ? 'text-lg'
      : 'text-base'
  const sizePadding =
    size === 'small'
      ? 'px-3 py-1'
      : size === 'large'
      ? 'px-6 py-3'
      : 'px-5 py-2'
  const sizeStyle = `${sizeClass} ${sizePadding}`

  const color =
    variant === 'brown'
      ? 'bg-foreground hover:bg-light-darker-brown text-white'
      : variant === 'pink'
      ? 'bg-light-pink foreground hover:bg-light-darker-pink text-brown'
      : 'bg-blue hover:bg-light-darker-blue text-white'
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      className={`rounded-xl w-min shadow whitespace-nowrap h-min font-semibold  ${color} ${sizeStyle} `}
    >
      {label}
    </button>
  )
}

export default Button
