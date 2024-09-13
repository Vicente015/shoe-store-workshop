# Cheatsheet para los alumnos

Usar la base de datos en los tests:

```php
class MyTest extends \Tests\TestCase {
    use RefreshDatabase; // Add this line, remember to import the class from Illuminate\Foundation\Testing\RefreshDatabase
}
```
 
Realizar peticiones con el cliente de test:

```php
    $this->get('/');
    $this->getJson('/');  // configura las cabezeras para enviar y recibir JSON
    $this->post('/');
    $this->postJson('/', ['key' => 'value']);
    
    // aserciones
    $response->assertStatus(200);
    $this->assertEquals(200, $response->status(), $response->getContent());  // probad la diferencia entre este y el anterior cuando sucede un error

```

autenticación de usuario:

```php
$user = User::create(['name' => 'John', 'email' => '', 'password' => '']);
$token = $user->createToken('anyTokenName')->plainTextToken;
$this
    ->withHeader('Authorization', 'Bearer ' . $token)
    ->get('/');
```
 
uso básico del ORM: 

```php 
    User::create(['name' => 'Test', 'email' => '...']);
    User::query()->count();
    User::query()->where('column', 'value')->first();
    User::query()->where('column', 'value')->all();
    User::all();
```

hacer tests con email

```php
    Mail::fake() // al principio del test para reemplazar el sistema de mails por un mock
    Mail::assertSentCount(1) // despues de ejecutar el código que envia emails
    Mail::assertSent(OrderCreated::class, 'customer@example.com'); // param1 mailable, param2 destinatario
```

inyección de dependencias:

```php
// in controller
class CheckoutController extends Controller {
    
    // cualquier argumento tipado será inyectado por el framework
    public function execute(ServiceType $srv) {
        // 
    }
}


Podemos instruir al framework a inyectar un mock en lugar de la implementación real:

```php
    $this->spy(PaymentApiClient::class);
    
    // or
    
    $this->mock(PaymentApiClient::class);
```

Podemos configurar los mocks para hacer verificaciones:

```php
    $paymentApiMock = $this->mock(PaymentApiClient::class);
    $paymentApiMock
        ->shouldReceive('setAmount')
        ->with(20) // check expected arguments
        ->once();  // expected number of calls
    $paymentApiMock
        ->shouldReceive('charge')
        ->andReturn(true)
        ->once();
```
