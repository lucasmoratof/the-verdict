export const Footer = () => {
    return (
        <footer className="bg-foreground text-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-serif font-bold">The Verdict</h3>
                        <p className="text-sm text-muted-foreground">Unbiased reviews for smarter shopping.</p>
                    </div>
                    <div className="text-sm">
                        <p>&copy; {new Date().getFullYear()} The Verdict. All rights reserved.</p>
                        <div className="flex justify-center md:justify-start gap-4 mt-2">
                            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                            <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};