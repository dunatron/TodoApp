<?php
namespace MyOrg\Model;

use SilverStripe\ORM\DataObject;
use SilverStripe\Assets\Image;
use SilverStripe\Security\Member;


class Event extends DataObject
{
    private static $db = [
        'Title' => 'Varchar(255)',
        'BgColor' => 'TractorCow\Colorpicker\Color'
    ];

    private static $has_one = [
        'Owner' => Member::class,
        'Image' => Image::class,
        'Category' => Category::class
    ];

    private static $default_sort = 'Created DESC';

    public function getThumbnail()
    {
        return $this->Image()->exists() ? $this->Image()->Fill(300, 300)->AbsoluteURL : null;
    }

    public function canView($member = null)
    {
        return true;
    }

    public function onAfterWrite()
    {
        parent::onAfterWrite();

        if ($this->Image()->exists()) {
            $this->Image()->copyVersionToStage('Stage', 'Live');
        }
    }
}