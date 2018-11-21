<?php

class AppController
{
    private $request = null;

    public function __construct()
    {
        // pobieranie danych z servera
        $this->request = strtolower( $_SERVER['REQUEST_METHOD'] );
    }

    public function isGet()
    {
        return $this->request === 'get';
    }


    public function isPost()
    {
        return $this->request === 'post';
    }

    public function render(string $fileName = null, $variables =[])
    {
        $path = $fileName ? dirname(__DIR__).'/views/'.get_class($this).'/'.$fileName.'.php' : '';

        $output = 'There isn\'t such file to render.';

        if (file_exists($path)) {
            
            // wypakowuje tablice asocjacyjną, pierwszy parametr w tablicy jest nową zmienną
            extract($variables);
            ob_start();

            include $path;

            $output = ob_get_clean();
        }
        print $output;
    }
}

?>
