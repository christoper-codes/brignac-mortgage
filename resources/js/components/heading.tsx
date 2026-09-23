export default function Heading({
    title,
    description,
    variant = 'default',
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    return (
        <header className={variant === 'small' ? 'mb-5' : 'mb-8 space-y-0.5'}>
            <h2
                className={
                    variant === 'small'
                        ? 'text-base font-semibold text-foreground'
                        : 'text-xl font-semibold tracking-tight text-foreground'
                }
            >
                {title}
            </h2>
            {description && (
                <p className="mt-1 text-sm text-foreground/60">{description}</p>
            )}
        </header>
    );
}
