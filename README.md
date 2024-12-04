hisTOURy

Technologies: React Native, MapBox, Expo, Supabase (PostGIS extension)

HisTOURy is an app where users can build their own guided tour, exploring historical locations in their local area. Functionality includes:
-Authentication to log in to their account
-Feed page with "on this day" and recently added markers
-Map with clickable markers, linking to marker pages with more information about the historical location
-Voting on markers
-Users can add markers to their planner and view the route on the map

<img width="358" alt="Screenshot 2024-12-04 at 10 35 07" src="https://github.com/user-attachments/assets/fb8ac5bd-0f03-406c-8c9b-ed6f0702de2d">
<img width="356" alt="Screenshot 2024-12-04 at 10 35 14" src="https://github.com/user-attachments/assets/c33f07f4-caab-478e-ac6f-28e02fc1f587">
<img width="355" alt="Screenshot 2024-12-04 at 10 35 24" src="https://github.com/user-attachments/assets/ad791081-b675-4d75-b57e-c32637144821">
<img width="355" alt="Screenshot 2024-12-04 at 10 35 20" src="https://github.com/user-attachments/assets/b24048e8-8eb2-4a08-86cf-68301a1b8a1c">



## Supabase

This project requires `PostGIS` extension. Entire setup and seeding is covered in migration files.

### Initial setup

1. Following env vars are required in `.env.local`
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://[PROJECT].supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
   ```
2. Run `npx supabase link` to link cloud account with CLI
3. Run `npx supabase db push` to apply all migrations
4. Run `npx supabase test db --linked` to prove schema

### Supabase Cloud Reset

**DANGER:** Run `npx supabase db reset --linked`

### Tests failing upon reset

**Reason:** DB cannot be tested after seeding.

1. Run `npx supabase db reset --linked --no-seed`
2. Run `npx supabase test db --linked`
3. Supabase CLI does not support on demand seeding at the time of writing this. At this step to seed database rerun reset without `--no-seed` flag

## Issues

### iOS: Mapbox not working

1. go to ios directory
2. run `pod install`
3. edit `[PROJECT]/ios/Pods/MapboxMaps/Sources/MapboxMaps/Annotations/ViewAnnotationManager.swift`

   1. replace following code

   ```swift
   public var annotations: [UIView: ViewAnnotationOptions] {
       idsByView.compactMapValues { [mapboxMap] id in
           try? mapboxMap.options(forViewAnnotationWithId: id)
       }
   }
   ```

   2. with

   ```swift
   public var annotations: [String: Optional<Any>] {
       var result: [String: Optional<Any>] = [:]

       for (view, options) in idsByView.compactMapValues({ [mapboxMap] id in try? mapboxMap.options(forViewAnnotationWithId: id) }) {
           let key = String(describing: view)
           result[key] = options
       }

       return result
   }
   ```

### iOS: Missing NSLocation\*UsageDescription

1. At `app.json` file add correct description into `expo.ios.infoPlist`
2. Run `npx expo prebuild --clean`
3. Run `npm run ios`
