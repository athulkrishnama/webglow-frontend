
import { useFormContext } from "react-hook-form";
import type { CreateProviderServiceFormData } from "../../schemas/provider-service.schema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { MapPin } from "lucide-react";

export function LocationSection() {
  const { register } = useFormContext<CreateProviderServiceFormData>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-blue-400" />
        <div>
          <h3 className="text-lg font-medium text-foreground mb-1">Location</h3>
        <p className="text-sm text-muted-foreground mb-4">
            Where is your service based?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            placeholder="123 Main St"
            {...register("location.address")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="New York"
            {...register("location.city")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder="NY"
            {...register("location.state")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            placeholder="10001"
            {...register("location.zipCode")}
          />
        </div>

        {/* Hidden coordinates for now - usually set via geocoding */}
        <input
          type="hidden"
          {...register("location.coordinates.0")}
          value={0}
        />
        <input
          type="hidden"
          {...register("location.coordinates.1")}
          value={0}
        />
        <input type="hidden" {...register("location.type")} value="Point" />
      </div>
    </div>
  );
}
