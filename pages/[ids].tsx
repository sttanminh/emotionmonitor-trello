import { useRouter } from 'next/router';

function CardPage() {
    const router = useRouter();
    console.log(router.query.ids);
    return <h1>Individual card page</h1>
}

export default CardPage;