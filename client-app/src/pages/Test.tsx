import { useState } from "react";
import { ImageEntity } from "../api/entities/ImageEntity";
import { PropertyImageSelectorSection } from "../components/PropertyImageSelectorSection";
import { PropertyAvailableSlotsSelectorSection } from "../components/PropertyAvailableSlotsSelectorSection";
import { AvailableTimeSlot } from "../api/entities/AvailableTimeSlot";
import { ImagesCarousel } from "../components/ImagesCarousel";

export function TestPage() {
    const [images, setImages] = useState<ImageEntity[]>([]);
    const [slots, setSlots] = useState<AvailableTimeSlot[]>([]);
    return (
        <div className="w-full flex flex-col items-center gap-8">
            <div className="flex flex-row w-full justify-between">
                <ImagesCarousel
                    images={images}
                />
                <PropertyImageSelectorSection
                    images={images}
                    setImages={setImages}
                />
            </div>
            <PropertyAvailableSlotsSelectorSection
                selectedSlots={slots}
                setSelectedSlots={setSlots}
            />
        </div>
    );
}
