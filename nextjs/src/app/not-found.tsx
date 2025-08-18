import {NextIntlClientProvider} from 'next-intl';
import {Link} from "@/i18n/navigation";


function NotFound() {
    return (
        <div style={{background: "red", margin: "0 auto", color: "white", textAlign: "center", fontSize: "2rem",padding: "22rem 0"}}>



        <NextIntlClientProvider locale="en" messages={{}}>
            <h3>Error</h3>
            <Link href={'/'}>
                go back
            </Link>
        </NextIntlClientProvider>
        </div>
    )

}

export default NotFound