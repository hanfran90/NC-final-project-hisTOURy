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
