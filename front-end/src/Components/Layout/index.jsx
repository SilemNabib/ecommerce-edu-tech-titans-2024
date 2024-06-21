/**
 * Renders a layout component that wraps its children in a flex container.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered inside the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
const Layout = ({ children }) => {
    return (
        <div className = 'items-center mt-5'>
            {children}
        </div>
    )
}

export default Layout