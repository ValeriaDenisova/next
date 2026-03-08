import Recipe from "@components/pages/Recipe";
import { resolveParamsId } from '../../../shared/utils/utils';
import '@styles/index.scss';

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   return {
//     title: title,
//     description: description,
//     openGraph: {
//       images: [images],
//     },
//   }
// }

export default async function RecipePage({ params }: { params: { id: string } }){
    const id = await resolveParamsId(params);

    return (
        <Recipe id={id} />
    )
}