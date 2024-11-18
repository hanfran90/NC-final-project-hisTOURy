## Issues

### Mapbox not working on iOS

1. go to ios directory
2. run `pod install`
3. edit `/Users/vicktoria/Northcoders/expo-history-spiking/ios/Pods/MapboxMaps/Sources/MapboxMaps/Annotations/ViewAnnotationAnchorConfig.swift`

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
