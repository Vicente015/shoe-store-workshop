# Para que los alumnos escriban los tests:
 
explicar la api del cliente de test:

```php
    $this->get('/')->expectStatus(200);
```
 
explicar uso básico del ORM 

```php 
    User::create(['name' => 'Test', 'email' => '...']);
    User::query()->count();
    User::query()->where('column', 'value')->first();
    User::query()->where('column', 'value')->all();
    User::all();
    
    // en los tests
    use RefreshDatabase;
```

explicar los fakes de Mail

```php
    Mail::fake()
    Mail::expectSentCount()
```

explicar la inyección de dependencias:

```php
// in controller
class CheckoutController extends Controller {
    public function execute(ServiceType $srv) {
        // 
    }
}

// in service provider
class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // only needed if the container cannot infer how to instantiate the service on its own
        $this->app->singleton(ServiceType::class, function () {
            return new ServiceClass(/* required params here */);
        });
    }
}
```

explicar como hacer un mock:

```php
    app()->bind(PaymentApiClient::class, function () {
        $paymentApiMock = $this->mock(PaymentApiClient::class);
        $paymentApiMock
            ->shouldReceive('setAmount')
            ->andReturnSelf();
        $paymentApiMock
            ->shouldReceive('charge')
            ->andReturn(true);

        return $paymentApiMock;
    });
```

como hacer verificaciones con un mock:

```php
    app()->bind(PaymentApiClient::class, function () {
        $paymentApiMock = $this->mock(PaymentApiClient::class);
        $paymentApiMock
            ->shouldReceive('setAmount')
            ->with(20) // check expected arguments
            ->andReturnSelf()
            ->once();  // expected number of calls
        $paymentApiMock
            ->shouldReceive('charge')
            ->andReturn(true)
            ->once();

        return $paymentApiMock;
    });
```

discutir si es mejor mockear el PaymentService en lugar del PaymentApiClient




# Feedback

quitar parametrizado de API_KEY
mostrar dolores antes de arreglarlos
si inyectamos solo el ApiClient en el controller podemos tener los tests en verde pero el codigo de producción esta en rojo
 - podemos hacer un test de servicios y hacer un app()->get(PaymentApiClient::get)

Poner el api client fuera del proyecto para dar la sensacion de ser un vendor, usar composer.json para traerlo
multiples niveles de test, tests rapidos, test intermedios y tests lentos
explicar test sociables vs solitarios
intentar hackear los tests
borrar las factorias en main
tener una lista de temas para charlas si hay tiempo
