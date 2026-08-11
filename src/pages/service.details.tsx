import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetBrowseServiceById } from '../hooks/use-provider-service';
import { Loader2, ArrowLeft, MapPin, DollarSign, Tag, Mail, AlertCircle, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { format, parseISO } from 'date-fns';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export function ServiceDetailsPage() {
  const { serviceId } = useParams({ strict: false }) as { serviceId: string };
  const navigate = useNavigate();

  const { data: service, isLoading, isError } = useGetBrowseServiceById(serviceId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
        <p className="text-muted-foreground text-sm font-medium">Loading service details...</p>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Service Not Found</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          The service you are looking for doesn't exist or is no longer available.
        </p>
        <Button onClick={() => navigate({ to: '/services' })}>
          Back to Services
        </Button>
      </div>
    );
  }

  const locationString = [service.location.address, service.location.city, service.location.state, service.location.zipCode]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="min-h-screen bg-background/50 pb-20">
      {/* Hero Banner Section */}
      <div className="relative h-[30vh] sm:h-[40vh] w-full bg-gradient-to-br from-blue-900/40 via-indigo-900/40 to-purple-900/40 overflow-hidden">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
        
        {/* Abstract Shapes for Rich Aesthetics */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 sm:pb-12">
          <button
            onClick={() => window.history.back()}
            className="absolute top-6 left-4 sm:left-6 lg:left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-border cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  <Tag className="w-3.5 h-3.5 mr-1.5" />
                  {service.category}
                </span>
                {service.isActive && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                    Active
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                {service.title}
              </h1>
            </div>
            
            <div className="shrink-0 bg-background/40 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl">
              <div className="text-sm text-muted-foreground font-medium mb-1 uppercase tracking-wider">Price</div>
              <div className="flex items-baseline gap-1">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-3xl sm:text-4xl font-bold text-foreground">
                  {service.pricePerDay.toLocaleString()}
                </span>
                <span className="text-muted-foreground font-medium">/ day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-4">About this service</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {service.description}
                </p>
              </div>
            </section>

            {service.contact && (
              <section className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Contact Provider</h2>
                  <p className="text-muted-foreground">
                    You can reach out to the provider directly at:
                  </p>
                  <a href={`mailto:${service.contact}`} className="inline-block mt-2 text-blue-400 font-medium hover:underline">
                    {service.contact}
                  </a>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Meta Info */}
          <div className="space-y-8">
            {/* Location Card */}
            <section className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Location</h2>
              </div>
              <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-4">
                {locationString || 'Location details not provided.'}
              </p>
              {service.location.coordinates && service.location.coordinates.length === 2 && (
                <div className="w-full h-48 bg-muted rounded-xl border border-border overflow-hidden relative z-0">
                  <MapContainer
                    center={[service.location.coordinates[1], service.location.coordinates[0]]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[service.location.coordinates[1], service.location.coordinates[0]]} />
                  </MapContainer>
                </div>
              )}
            </section>

            {/* Availability Card */}
            <section className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Availability</h2>
              </div>
              
              {service.availability && service.availability.length > 0 ? (
                <div className="space-y-3">
                  {service.availability.map((slot, idx) => (
                    <div key={idx} className="flex flex-col p-3 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">From</span>
                        <span className="font-medium text-foreground">
                          {format(parseISO(slot.startDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <div className="h-px bg-border my-2 w-full opacity-50" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">To</span>
                        <span className="font-medium text-foreground">
                          {format(parseISO(slot.endDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 bg-muted/30 rounded-xl border border-border border-dashed">
                  <p className="text-muted-foreground text-sm font-medium">No specific availability slots listed.</p>
                </div>
              )}
            </section>

            {/* Sticky/Fixed CTA on Mobile, Regular on Desktop */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border z-10 lg:static lg:bg-transparent lg:border-none lg:p-0 lg:backdrop-blur-none">
              <Button className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold shadow-lg shadow-blue-500/25 transition-transform hover:-translate-y-0.5">
                Contact Provider
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
