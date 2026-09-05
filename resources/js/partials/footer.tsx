export function Footer({ dark = false }: { dark?: boolean }) {
    return (
        <footer
            data-header-theme={dark ? 'dark' : undefined}
            className={`mx-auto flex w-full max-w-2xl items-center justify-center ${dark ? 'bg-background' : 'bg-white'}`}
        >
            <img
                src={dark ? '/img/dark_footer.png' : '/img/footer.png'}
                alt="lion Brignac Mortgage"
                className="h-full w-full"
            />
        </footer>
    );
}
