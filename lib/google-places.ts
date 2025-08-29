interface PlaceResult {
  formatted_address: string;
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export class GooglePlacesService {
  private static instance: GooglePlacesService;
  private autocompleteService: google.maps.places.AutocompleteService | null = null;
  private placesService: google.maps.places.PlacesService | null = null;

  private constructor() {}

  public static getInstance(): GooglePlacesService {
    if (!GooglePlacesService.instance) {
      GooglePlacesService.instance = new GooglePlacesService();
    }
    return GooglePlacesService.instance;
  }

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Google Places can only be initialized in browser'));
        return;
      }

      if (window.google?.maps?.places) {
        this.setupServices();
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=fr`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        this.setupServices();
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API'));
      };

      document.head.appendChild(script);
    });
  }

  private setupServices(): void {
    if (window.google?.maps?.places) {
      this.autocompleteService = new window.google.maps.places.AutocompleteService();
      
      // Create a dummy div for PlacesService
      const div = document.createElement('div');
      const map = new window.google.maps.Map(div);
      this.placesService = new window.google.maps.places.PlacesService(map);
    }
  }

  async getPlacePredictions(input: string): Promise<google.maps.places.AutocompletePrediction[]> {
    if (!this.autocompleteService) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      if (!this.autocompleteService) {
        reject(new Error('Autocomplete service not available'));
        return;
      }

      this.autocompleteService.getPlacePredictions({
        input,
        componentRestrictions: { country: 'fr' },
        types: ['address'],
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(48.8566, 2.3522), // Paris center
          new window.google.maps.LatLng(48.8566, 2.3522)
        ),
        radius: 50000 // 50km radius around Paris
      }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(predictions || []);
        } else {
          reject(new Error(`Places API error: ${status}`));
        }
      });
    });
  }

  async getPlaceDetails(placeId: string): Promise<PlaceResult> {
    if (!this.placesService) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      if (!this.placesService) {
        reject(new Error('Places service not available'));
        return;
      }

      this.placesService.getDetails({
        placeId,
        fields: ['formatted_address', 'address_components', 'geometry']
      }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          resolve(place as PlaceResult);
        } else {
          reject(new Error(`Place details error: ${status}`));
        }
      });
    });
  }

  extractPostalCode(place: PlaceResult): string | null {
    const postalComponent = place.address_components.find(
      component => component.types.includes('postal_code')
    );
    return postalComponent?.short_name || null;
  }

  extractCity(place: PlaceResult): string | null {
    const cityComponent = place.address_components.find(
      component => component.types.includes('locality') || 
                  component.types.includes('administrative_area_level_2')
    );
    return cityComponent?.long_name || null;
  }
}

// Global type declaration for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}