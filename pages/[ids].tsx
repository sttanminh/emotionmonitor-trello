import { useRouter } from 'next/router';

function CardPage() {
    const router = useRouter();
    console.log(router.query);
    var {cardId, memberId, boardId} = router.query;
    console.log(cardId);
    console.log(memberId);
    console.log(boardId);
    return <h1>Individual card page</h1>
}

export default CardPage;