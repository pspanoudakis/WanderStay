import { useParams } from "react-router-dom";
import { PropertyPage } from "./PropertyPage";

export function PropertyHostViewPage() {
    const {propertyId} = useParams();
    
    return (
        <PropertyPage
            isEditable={true}
            propertyId={Number(propertyId)}
        />
    );
}
