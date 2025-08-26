<?php
/**
 * 简单的PHP Email Form类
 * 用于替代缺失的BootstrapMade PHP Email Form库
 */
class PHP_Email_Form {
    public $ajax = true;
    public $to = '';
    public $from_name = '';
    public $from_email = '';
    public $subject = '';
    public $smtp = array();
    private $messages = array();
    
    /**
     * 添加消息内容
     * @param string $content 消息内容
     * @param string $label 标签
     * @param int $priority 优先级
     */
    public function add_message($content, $label, $priority = 1) {
        $this->messages[] = array(
            'content' => $content,
            'label' => $label,
            'priority' => $priority
        );
    }
    
    /**
     * 发送邮件
     * @return string 返回结果
     */
    public function send() {
        // 验证必要字段
        if (empty($this->to) || empty($this->from_email) || empty($this->subject)) {
            return 'Error: Missing required fields';
        }
        
        // 构建邮件内容
        $message_body = "";
        foreach ($this->messages as $msg) {
            $message_body .= $msg['label'] . ": " . $msg['content'] . "\n";
        }
        
        // 设置邮件头
        $headers = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/plain; charset=UTF-8';
        $headers[] = 'From: ' . $this->from_name . ' <' . $this->from_email . '>';
        $headers[] = 'Reply-To: ' . $this->from_email;
        $headers[] = 'X-Mailer: PHP/' . phpversion();
        
        // 如果配置了SMTP，使用SMTP发送（这里简化处理）
        if (!empty($this->smtp)) {
            // 实际项目中应该使用PHPMailer或SwiftMailer等库
            return 'SMTP configuration detected but not implemented in this simple version';
        }
        
        // 使用PHP内置mail函数发送
        $success = mail($this->to, $this->subject, $message_body, implode("\r\n", $headers));
        
        if ($success) {
            return 'OK';
        } else {
            return 'Error: Failed to send email. Please check your server mail configuration.';
        }
    }
}
?>