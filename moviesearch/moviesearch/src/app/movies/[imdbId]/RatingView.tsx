
import { Rating } from "@/app/types/Rating";

type RatingViewProps = {
    ratings: Rating[];
};

export default function RatingView({ ratings }: RatingViewProps) {
    if (!ratings || ratings.length === 0) {
        return <p>No ratings available.</p>;
    }

    return (
        <div>
            <h3>Ratings</h3>
            <ul>
                {ratings.map((rating, index) => (
                    <li key={index}>
                        <strong>{rating.Source}:</strong> {rating.Value}
                    </li>
                ))}
            </ul>
        </div>
    );
}
